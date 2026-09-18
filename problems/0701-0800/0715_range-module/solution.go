package main

// first index with values[index] >= target (bisect_left)
func lowerBound(values []int, target int) int {
	low, high := 0, len(values)
	for low < high {
		mid := (low + high) / 2
		if values[mid] < target {
			low = mid + 1
		} else {
			high = mid
		}
	}
	return low
}

// first index with values[index] > target (bisect_right)
func upperBound(values []int, target int) int {
	low, high := 0, len(values)
	for low < high {
		mid := (low + high) / 2
		if values[mid] <= target {
			low = mid + 1
		} else {
			high = mid
		}
	}
	return low
}

// replaces values[from:to] with a single value
func splice(values []int, from int, to int, value int) []int {
	values = append(values[:from], values[to:]...)
	values = append(values, 0)
	copy(values[from+1:], values[from:])
	values[from] = value
	return values
}

// replaces values[from:to] with the replacement run (possibly empty)
func replaceRange(values []int, from int, to int, replacement []int) []int {
	tail := append([]int(nil), values[to:]...)
	values = append(values[:from], replacement...)
	return append(values, tail...)
}

// RangeModule keeps the tracked set as canonical disjoint intervals
// (parallel starts/ends). The slices stay sorted and gap-separated: adds
// merge what they overlap or touch, removes carve holes, so any
// fully-tracked query is contained in a single stored interval.
type RangeModule struct {
	starts []int
	ends   []int
}

func NewRangeModuleTyped() *RangeModule {
	return &RangeModule{}
}

func (design *RangeModule) addRange(start int, end int) {
	i := lowerBound(design.ends, start) // first interval ending at/after start
	j := upperBound(design.starts, end) // first interval starting after end
	if i < j {
		if design.starts[i] < start {
			start = design.starts[i]
		}
		if design.ends[j-1] > end {
			end = design.ends[j-1]
		}
	}
	design.starts = splice(design.starts, i, j, start)
	design.ends = splice(design.ends, i, j, end)
}

func (design *RangeModule) queryRange(start int, end int) bool {
	i := upperBound(design.starts, start) - 1 // last interval starting at/before start
	return i >= 0 && design.ends[i] >= end
}

func (design *RangeModule) removeRange(start int, end int) {
	i := upperBound(design.ends, start) // first interval ending after start
	j := lowerBound(design.starts, end) // first interval starting after end
	newStarts := []int{}
	newEnds := []int{}
	if i < j {
		if design.starts[i] < start {
			newStarts = append(newStarts, design.starts[i])
			newEnds = append(newEnds, start)
		}
		if design.ends[j-1] > end {
			newStarts = append(newStarts, end)
			newEnds = append(newEnds, design.ends[j-1])
		}
	}
	design.starts = replaceRange(design.starts, i, j, newStarts)
	design.ends = replaceRange(design.ends, i, j, newEnds)
}
