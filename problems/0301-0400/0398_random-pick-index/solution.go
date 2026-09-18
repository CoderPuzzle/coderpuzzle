package main

import "math/rand"

type Solution struct {
	positions map[int][]int
}

func NewSolutionTyped(nums []int) *Solution {
	// One pass buckets the indices of every value; drawIndex(target)
	// draws one of that value's index buckets uniformly, so each
	// qualifying index is exactly equally likely.
	positions := make(map[int][]int)
	for index, value := range nums {
		positions[value] = append(positions[value], index)
	}
	return &Solution{positions: positions}
}

func (design *Solution) pick(target int) int {
	indices := design.positions[target]
	return indices[rand.Intn(len(indices))]
}
