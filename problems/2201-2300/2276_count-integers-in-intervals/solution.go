package main

import "sort"

type CountIntervals struct {
	starts  []int
	ends    []int
	covered int
}

func NewCountIntervalsTyped() *CountIntervals {
	return &CountIntervals{starts: []int{}, ends: []int{}}
}

func (design *CountIntervals) add(left int, right int) {
	starts, ends := design.starts, design.ends
	// Intervals with start <= right occupy [0, hi); disjoint and sorted,
	// their ends are sorted too, so those reaching [left, ...] are the
	// suffix [lo, hi).
	hi := sort.Search(len(starts), func(i int) bool { return starts[i] > right })
	lo := sort.Search(len(ends), func(i int) bool { return ends[i] >= left })
	if lo > hi {
		lo = hi
	}
	if lo < hi {
		if starts[lo] < left {
			left = starts[lo]
		}
		if ends[hi-1] > right {
			right = ends[hi-1]
		}
		for index := lo; index < hi; index++ {
			design.covered -= ends[index] - starts[index] + 1
		}
		starts = append(starts[:lo], starts[hi:]...)
		ends = append(ends[:lo], ends[hi:]...)
	}
	// The hull takes the spliced-out run's place at lo.
	starts = append(starts, 0)
	copy(starts[lo+1:], starts[lo:])
	starts[lo] = left
	ends = append(ends, 0)
	copy(ends[lo+1:], ends[lo:])
	ends[lo] = right
	design.starts = starts
	design.ends = ends
	design.covered += right - left + 1
}

func (design *CountIntervals) count() int {
	return design.covered
}
