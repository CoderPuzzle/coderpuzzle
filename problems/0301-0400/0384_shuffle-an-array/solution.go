package main

import "math/rand"

// Solution keeps the pristine original untouched; every shuffle() runs
// Fisher-Yates on a fresh copy — slot i (from the top down) swaps with a
// uniformly chosen slot in [0, i] — so each of the n! orderings is exactly
// equally likely, and reset() is a plain copy.
type Solution struct {
	original []int
}

func NewSolutionTyped(nums []int) *Solution {
	original := make([]int, len(nums))
	copy(original, nums)
	return &Solution{original: original}
}

func (design *Solution) reset() []int {
	reset := make([]int, len(design.original))
	copy(reset, design.original)
	return reset
}

func (design *Solution) shuffle() []int {
	array := make([]int, len(design.original))
	copy(array, design.original)
	for i := len(array) - 1; i > 0; i-- {
		j := rand.Intn(i + 1)
		array[i], array[j] = array[j], array[i]
	}
	return array
}
