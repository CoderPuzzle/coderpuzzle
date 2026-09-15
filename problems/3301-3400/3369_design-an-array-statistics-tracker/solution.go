// Every statistic lives in its own incrementally maintained structure: a
// queue holds arrival order, a running sum serves the mean, two heaps
// split the live values into a lower and an upper half so the median is
// always at a top, and a (count, value) heap answers the mode. Removals
// are FIFO and arbitrary for a heap, so an erased value is only marked in
// a delayed counter and discarded when it surfaces at a top; rebalancing
// counts only live entries, and the mode heap's stale entries are skipped
// lazily the same way. Each call costs O(log n) amortized. The running
// sum reaches 1e5 * 1e9 = 1e14, so it is held in an int64.
package main

import (
	"container/heap"
)

type numberHeap []int

func (h numberHeap) Len() int { return len(h) }
func (h numberHeap) Less(i, j int) bool {
	// small stores negated values, so one min-heap ordering serves both
	// halves: the max-heap side pushes negations.
	return h[i] < h[j]
}
func (h numberHeap) Swap(i, j int) { h[i], h[j] = h[j], h[i] }
func (h *numberHeap) Push(x interface{}) {
	*h = append(*h, x.(int))
}
func (h *numberHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

type modeEntry struct {
	negCount int
	value    int
}

type modeHeap []modeEntry

func (h modeHeap) Len() int { return len(h) }
func (h modeHeap) Less(i, j int) bool {
	if h[i].negCount != h[j].negCount {
		return h[i].negCount < h[j].negCount
	}
	return h[i].value < h[j].value
}
func (h modeHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *modeHeap) Push(x interface{}) { *h = append(*h, x.(modeEntry)) }
func (h *modeHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

type StatisticsTracker struct {
	queue     []int
	head      int
	total     int64
	small     numberHeap // negated values: lower half
	large     numberHeap // raw values: upper half
	smallSize int        // live sizes, ghosts excluded
	largeSize int
	delayed   map[int]int
	counts    map[int]int
	modeHeap  modeHeap
}

func NewStatisticsTrackerTyped() *StatisticsTracker {
	return &StatisticsTracker{
		delayed: make(map[int]int),
		counts:  make(map[int]int),
	}
}

// pruneSmall discards ghosts queued for deletion while they sit at the top.
func (design *StatisticsTracker) pruneSmall() {
	for design.small.Len() > 0 {
		value := -design.small[0]
		if design.delayed[value] > 0 {
			design.delayed[value]--
			heap.Pop(&design.small)
		} else {
			break
		}
	}
}

func (design *StatisticsTracker) pruneLarge() {
	for design.large.Len() > 0 {
		value := design.large[0]
		if design.delayed[value] > 0 {
			design.delayed[value]--
			heap.Pop(&design.large)
		} else {
			break
		}
	}
}

// rebalance keeps ceil(n/2) live values in small; the median read sits at
// a top after this. Moves only touch pruned, live tops.
func (design *StatisticsTracker) rebalance() {
	if design.smallSize > design.largeSize+1 {
		heap.Push(&design.large, -heap.Pop(&design.small).(int))
		design.smallSize--
		design.largeSize++
		design.pruneSmall()
	} else if design.smallSize < design.largeSize {
		heap.Push(&design.small, -heap.Pop(&design.large).(int))
		design.smallSize++
		design.largeSize--
		design.pruneLarge()
	}
}

func (design *StatisticsTracker) addNumber(number int) {
	design.queue = append(design.queue, number)
	design.total += int64(number)
	design.counts[number]++
	// An entry exists for every count level each value reaches, so the
	// current count of any live value is always in the heap.
	heap.Push(&design.modeHeap, modeEntry{negCount: -design.counts[number], value: number})
	if design.small.Len() == 0 || number <= -design.small[0] {
		heap.Push(&design.small, -number)
		design.smallSize++
	} else {
		heap.Push(&design.large, number)
		design.largeSize++
	}
	design.rebalance()
}

func (design *StatisticsTracker) removeFirstAddedNumber() {
	number := design.queue[design.head]
	design.head++
	design.total -= int64(number)
	design.counts[number]--
	// The ghost is charged to the half its value belongs to; when a
	// matching copy surfaces at that top it is discarded, which keeps
	// fungible duplicates consistent.
	design.delayed[number]++
	if number <= -design.small[0] {
		design.smallSize--
		if number == -design.small[0] {
			design.pruneSmall()
		}
	} else {
		design.largeSize--
		if number == design.large[0] {
			design.pruneLarge()
		}
	}
	design.rebalance()
}

func (design *StatisticsTracker) getMean() int {
	return int(design.total / int64(len(design.queue)-design.head))
}

func (design *StatisticsTracker) getMedian() int {
	design.pruneSmall()
	design.pruneLarge()
	if design.smallSize > design.largeSize {
		return -design.small[0]
	}
	// Even count: the larger of the two middles is the upper half's
	// minimum.
	return design.large[0]
}

func (design *StatisticsTracker) getMode() int {
	for design.modeHeap.Len() > 0 {
		top := design.modeHeap[0]
		if design.counts[top.value] == -top.negCount {
			return top.value
		}
		heap.Pop(&design.modeHeap)
	}
	panic("empty tracker")
}
