package main

// The list is materialized once as an array of node values (the wire
// form already lists them in order). draw draws one slot uniformly from a
// splitmix64 stream — the design wrapper compiles the submission into its
// own main with fixed imports, so the tiny generator lives here.
type Solution struct {
	values []int
	random uint64
}

func NewSolutionTyped(head []int) *Solution {
	return &Solution{values: append([]int(nil), head...)}
}

func (design *Solution) nextUint64() uint64 {
	design.random += 0x9E3779B97F4A7C15
	z := design.random
	z = (z ^ (z >> 30)) * 0xBF58476D1CE4E5B9
	z = (z ^ (z >> 27)) * 0x94D049BB133111EB
	return z ^ (z >> 31)
}

func (design *Solution) getRandom() int {
	return design.values[int(design.nextUint64()%uint64(len(design.values)))]
}
