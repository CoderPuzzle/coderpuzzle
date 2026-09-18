package main

// MyCalendarThree tracks the per-instant change in the number of live
// intervals (+1 where one opens, -1 where one closes) in time order.
type MyCalendarThree struct {
	times  []int // sorted boundary instants
	deltas []int // parallel per-instant change in live intervals
}

func NewMyCalendarThreeTyped() *MyCalendarThree {
	return &MyCalendarThree{}
}

// first index with times[index] >= target (bisect_left)
func (design *MyCalendarThree) lowerBound(target int) int {
	low, high := 0, len(design.times)
	for low < high {
		mid := (low + high) / 2
		if design.times[mid] < target {
			low = mid + 1
		} else {
			high = mid
		}
	}
	return low
}

// applies a +1/-1 change at time, creating the boundary if needed
func (design *MyCalendarThree) apply(time int, change int) {
	index := design.lowerBound(time)
	if index < len(design.times) && design.times[index] == time {
		design.deltas[index] += change
		return
	}
	design.times = append(design.times, 0)
	design.deltas = append(design.deltas, 0)
	copy(design.times[index+1:], design.times[index:])
	copy(design.deltas[index+1:], design.deltas[index:])
	design.times[index] = time
	design.deltas[index] = change
}

func (design *MyCalendarThree) book(start int, end int) int {
	design.apply(start, 1)
	design.apply(end, -1)
	best := 0
	active := 0
	// Sweep boundaries in time order; the running sum is the number of
	// events active at that moment, so its peak is the deepest overlap seen.
	// Changes at one instant merge, so an interval closing where another
	// opens is never counted twice.
	for index := range design.times {
		active += design.deltas[index]
		if active > best {
			best = active
		}
	}
	return best
}
