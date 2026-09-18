package main

import (
	"math/rand"
	"time"
)

// RandomizedSet: hash map from value -> index, plus a values array.
// remove swaps the victim with the last element and pops, so
// insert/remove/draw are all O(1); draw draws uniformly from the
// live values.
type RandomizedSet struct {
	values []int
	index  map[int]int
	random *rand.Rand
}

func NewRandomizedSetTyped() *RandomizedSet {
	return &RandomizedSet{
		values: []int{},
		index:  map[int]int{},
		random: rand.New(rand.NewSource(time.Now().UnixNano())),
	}
}

func (design *RandomizedSet) insert(val int) bool {
	if _, exists := design.index[val]; exists {
		return false
	}
	design.index[val] = len(design.values)
	design.values = append(design.values, val)
	return true
}

func (design *RandomizedSet) remove(val int) bool {
	slot, exists := design.index[val]
	if !exists {
		return false
	}
	delete(design.index, val)
	last := len(design.values) - 1
	if slot != last {
		moved := design.values[last]
		design.values[slot] = moved
		design.index[moved] = slot
	}
	design.values = design.values[:last]
	return true
}

func (design *RandomizedSet) getRandom() int {
	return design.values[design.random.Intn(len(design.values))]
}
