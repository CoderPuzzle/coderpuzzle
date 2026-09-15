package main

import "sort"

// ExamTracker keeps an append-only timeline with running prefix totals:
// chronological calls keep `times` sorted, so a query binary-searches the
// window [startTime, endTime] and subtracts two prefix totals.
type ExamTracker struct {
	times []int
	// Held in int64: up to 10^5 scores of 10^9 push totals near 10^14,
	// far past 32-bit range.
	sums []int64
}

func NewExamTrackerTyped() *ExamTracker {
	return &ExamTracker{}
}

func (design *ExamTracker) record(time int, score int) {
	var previous int64
	if len(design.sums) > 0 {
		previous = design.sums[len(design.sums)-1]
	}
	design.times = append(design.times, time)
	design.sums = append(design.sums, previous+int64(score))
}

func (design *ExamTracker) totalScore(startTime int, endTime int) int64 {
	left := sort.SearchInts(design.times, startTime)
	right := sort.Search(len(design.times), func(i int) bool { return design.times[i] > endTime }) - 1
	if left > right {
		return 0
	}
	total := design.sums[right]
	if left > 0 {
		total -= design.sums[left-1]
	}
	return total
}
