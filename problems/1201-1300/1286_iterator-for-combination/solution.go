package main

import (
	"math/bits"
	"sort"
	"strings"
)

type CombinationIterator struct {
	combinations []string
	position     int
}

// NewCombinationIteratorTyped is the design-replay constructor.
func NewCombinationIteratorTyped(characters string, combinationLength int) *CombinationIterator {
	// Precompute all combinations via bitmask enumeration. With n <= 15
	// there are at most 2^15 masks; a mask is kept when its popcount
	// equals the combination length. Ascending mask order groups the
	// strings by their highest chosen index rather than by first letter,
	// so an explicit sort restores the lexicographic sequence.
	iterator := &CombinationIterator{}
	n := len(characters)
	for mask := 0; mask < 1<<n; mask++ {
		if bits.OnesCount(uint(mask)) != combinationLength {
			continue
		}
		var sb strings.Builder
		for i := 0; i < n; i++ {
			if mask>>i&1 == 1 {
				sb.WriteByte(characters[i])
			}
		}
		iterator.combinations = append(iterator.combinations, sb.String())
	}
	sort.Strings(iterator.combinations)
	return iterator
}

func (design *CombinationIterator) next() string {
	combo := design.combinations[design.position]
	design.position++
	return combo
}

func (design *CombinationIterator) hasNext() bool {
	return design.position < len(design.combinations)
}
