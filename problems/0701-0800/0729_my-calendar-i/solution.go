package main

import "sort"

// Accepted reservations as parallel sorted starts/ends slices: a new event
// can only conflict with the reservation before and after its insertion
// point; binary search locates them in O(log n).
type MyCalendar struct {
	starts []int
	ends   []int
}

func NewMyCalendarTyped() *MyCalendar {
	return &MyCalendar{starts: []int{}, ends: []int{}}
}

func (design *MyCalendar) book(start int, end int) bool {
	starts, ends := design.starts, design.ends
	// bisect_right: first index whose start exceeds `start`.
	position := sort.Search(len(starts), func(i int) bool { return starts[i] > start })
	index := position - 1 // last reservation with start <= start
	// Half-open intervals: strict tests mean touching endpoints coexist.
	if index >= 0 && ends[index] > start {
		return false
	}
	if index+1 < len(starts) && starts[index+1] < end {
		return false
	}
	// Insert exactly at the searched position — stays sorted, no re-sort.
	starts = append(starts, 0)
	copy(starts[position+1:], starts[position:])
	starts[position] = start
	ends = append(ends, 0)
	copy(ends[position+1:], ends[position:])
	ends[position] = end
	design.starts = starts
	design.ends = ends
	return true
}
