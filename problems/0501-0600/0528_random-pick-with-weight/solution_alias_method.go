package main

// Walker alias table: n columns of height total, index i's own material
// filling weights[i] * n of its column and a donor's topping up the rest;
// one uniform cell of the n * total grid lands on index i's material with
// probability exactly weights[i] / total. The draw is a splitmix64
// stream: the design wrapper compiles the submission into its own main
// with fixed imports, so the tiny generator lives here.
type Solution struct {
	columns int
	total   int64
	height  []int64
	alias   []int
	random  uint64
}

func NewSolutionTyped(weights []int) *Solution {
	n := len(weights)
	design := &Solution{columns: n, height: make([]int64, n), alias: make([]int, n)}
	for _, weight := range weights {
		design.total += int64(weight)
	}
	var small, large []int
	for c := 0; c < n; c++ {
		design.height[c] = int64(weights[c]) * int64(n)
		if design.height[c] < design.total {
			small = append(small, c)
		} else {
			large = append(large, c)
		}
	}
	for len(small) > 0 && len(large) > 0 {
		under, over := small[len(small)-1], large[len(large)-1]
		small, large = small[:len(small)-1], large[:len(large)-1]
		design.alias[under] = over
		design.height[over] -= design.total - design.height[under]
		switch {
		case design.height[over] < design.total:
			small = append(small, over)
		case design.height[over] > design.total:
			large = append(large, over)
		}
	}
	return design
}

func (design *Solution) nextUint64() uint64 {
	design.random += 0x9E3779B97F4A7C15
	z := design.random
	z = (z ^ (z >> 30)) * 0xBF58476D1CE4E5B9
	z = (z ^ (z >> 27)) * 0x94D049BB133111EB
	return z ^ (z >> 31)
}

func (design *Solution) pickIndex() int {
	span := uint64(design.columns) * uint64(design.total)
	cell := design.nextUint64() % span
	column := cell % uint64(design.columns)
	if cell/uint64(design.columns) < uint64(design.height[column]) {
		return int(column)
	}
	return design.alias[column]
}
