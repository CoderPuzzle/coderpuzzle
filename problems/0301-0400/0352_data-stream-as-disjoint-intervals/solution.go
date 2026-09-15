// Sorted disjoint [start, end] intervals, merged at add time; addNum
// binary-searches the starts for the value's slot and repairs at most the
// two neighbors; getIntervals hands out a copy.
type SummaryRanges struct {
	intervals [][]int
}

func NewSummaryRangesTyped() *SummaryRanges {
	return &SummaryRanges{intervals: make([][]int, 0)}
}

func (design *SummaryRanges) addNum(value int) {
	low, high := 0, len(design.intervals)
	for low < high {
		middle := (low + high) / 2
		if design.intervals[middle][0] < value {
			low = middle + 1
		} else {
			high = middle
		}
	}
	index := low
	touchesLeft := index > 0 && design.intervals[index-1][1]+1 >= value
	touchesRight := index < len(design.intervals) && design.intervals[index][0]-1 <= value
	if touchesLeft && touchesRight {
		// value welds the two neighbors into one interval.
		design.intervals[index-1][1] = design.intervals[index][1]
		design.intervals = append(design.intervals[:index], design.intervals[index+1:]...)
	} else if touchesLeft {
		// Extend the left neighbor; a value it already covers is a no-op.
		if design.intervals[index-1][1] < value {
			design.intervals[index-1][1] = value
		}
	} else if touchesRight {
		design.intervals[index][0] = value
	} else {
		design.intervals = append(design.intervals, nil)
		copy(design.intervals[index+1:], design.intervals[index:])
		design.intervals[index] = []int{value, value}
	}
}

func (design *SummaryRanges) getIntervals() [][]int {
	summary := make([][]int, len(design.intervals))
	for index, interval := range design.intervals {
		copied := make([]int, len(interval))
		copy(copied, interval)
		summary[index] = copied
	}
	return summary
}
