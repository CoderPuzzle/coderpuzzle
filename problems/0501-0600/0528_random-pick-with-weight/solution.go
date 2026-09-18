package main

// Prefix sums lay the weights end to end over [0, total); one uniform
// draw lands in exactly one segment, so index i comes back with
// probability exactly weights[i] / total. The draw is a splitmix64
// stream: the design wrapper compiles the submission into its own main
// with fixed imports, so the tiny generator lives here.
type Solution struct {
	prefix []int64
	random uint64
}

func NewSolutionTyped(weights []int) *Solution {
	design := &Solution{prefix: make([]int64, len(weights)+1)}
	for i, weight := range weights {
		design.prefix[i+1] = design.prefix[i] + int64(weight)
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
	total := design.prefix[len(design.prefix)-1]
	target := 1 + int64(design.nextUint64()%uint64(total))
	low, high := 1, len(design.prefix)-1 // first index with prefix[i] >= target
	for low < high {
		mid := int(uint(low+high) >> 1)
		if design.prefix[mid] >= target {
			high = mid
		} else {
			low = mid + 1
		}
	}
	return low - 1
}
