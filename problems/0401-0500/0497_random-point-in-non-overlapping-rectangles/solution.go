package main

import (
	"math/rand"
	"sort"
)

// Solution picks a rectangle with probability proportional to its area
// (integer cells, (xi-ai+1)*(yi-bi+1)) via prefix sums, then a uniform cell
// offset inside it yields the point — so every covered integer point is
// exactly equally likely.
type Solution struct {
	rects  [][]int
	prefix []int64
}

func NewSolutionTyped(rects [][]int) *Solution {
	prefix := make([]int64, len(rects)+1)
	for i, rect := range rects {
		area := int64(rect[2]-rect[0]+1) * int64(rect[3]-rect[1]+1)
		prefix[i+1] = prefix[i] + area
	}
	return &Solution{rects: rects, prefix: prefix}
}

func (design *Solution) pick() []int {
	cell := rand.Int63n(design.prefix[len(design.prefix)-1])
	// First rectangle whose cumulative area exceeds the drawn cell.
	index := sort.Search(len(design.rects), func(i int) bool {
		return design.prefix[i+1] > cell
	})
	rect := design.rects[index]
	width := int64(rect[2] - rect[0] + 1)
	offset := cell - design.prefix[index]
	return []int{rect[0] + int(offset%width), rect[1] + int(offset/width)}
}
