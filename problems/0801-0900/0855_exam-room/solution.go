package main

// segment is a free gap spanning adjacent occupied seats l and r
// (sentinels -1 and n at the edges); its candidate seat and distance
// are pure functions of the pair.
type segment struct {
	dist int // distance from the gap's edge to its candidate seat
	spot int // the seat assign() would place in this gap
	l    int
	r    int
}

// gapHeap is a hand-rolled binary max-heap over segments: larger
// distance first, then the lower seat number (the design wrapper
// assembles one source file, so the submission cannot add imports
// such as container/heap).
type gapHeap []segment

func (heap gapHeap) less(i int, j int) bool {
	if heap[i].dist != heap[j].dist {
		return heap[i].dist > heap[j].dist
	}
	return heap[i].spot < heap[j].spot
}

func (heap *gapHeap) push(item segment) {
	*heap = append(*heap, item)
	index := len(*heap) - 1
	for index > 0 {
		parent := (index - 1) / 2
		if !heap.less(index, parent) {
			break
		}
		(*heap)[index], (*heap)[parent] = (*heap)[parent], (*heap)[index]
		index = parent
	}
}

func (heap *gapHeap) pop() segment {
	top := (*heap)[0]
	last := len(*heap) - 1
	(*heap)[0] = (*heap)[last]
	*heap = (*heap)[:last]
	index := 0
	for {
		left := 2*index + 1
		if left >= last {
			break
		}
		best := left
		if right := left + 1; right < last && heap.less(right, left) {
			best = right
		}
		if !heap.less(best, index) {
			break
		}
		(*heap)[index], (*heap)[best] = (*heap)[best], (*heap)[index]
		index = best
	}
	return top
}

// ExamRoom keeps a max-heap of free-gap segments, lazily deleted
// through the live-segment set: stale entries are skipped on pop because
// the candidate seat and distance are pure functions of (l, r).
type ExamRoom struct {
	n        int
	occupied []int // sorted seat numbers
	live     map[[2]int]bool
	heap     gapHeap
}

func NewExamRoomTyped(n int) *ExamRoom {
	return &ExamRoom{n: n, live: make(map[[2]int]bool)}
}

// first index with occupied[index] >= target (bisect_left)
func (design *ExamRoom) firstAtLeast(target int) int {
	low, high := 0, len(design.occupied)
	for low < high {
		mid := (low + high) / 2
		if design.occupied[mid] < target {
			low = mid + 1
		} else {
			high = mid
		}
	}
	return low
}

func (design *ExamRoom) seat() int {
	if len(design.occupied) == 0 {
		design.occupied = append(design.occupied, 0)
		design.addSegment(0, design.n)
		return 0
	}
	for len(design.heap) > 0 {
		top := design.heap.pop()
		key := [2]int{top.l, top.r}
		if !design.live[key] {
			continue // stale entry
		}
		delete(design.live, key)
		index := design.firstAtLeast(top.spot)
		design.occupied = append(design.occupied, 0)
		copy(design.occupied[index+1:], design.occupied[index:])
		design.occupied[index] = top.spot
		design.addSegment(top.l, top.spot)
		design.addSegment(top.spot, top.r)
		return top.spot
	}
	panic("no seat available")
}

func (design *ExamRoom) leave(p int) {
	index := design.firstAtLeast(p)
	design.occupied = append(design.occupied[:index], design.occupied[index+1:]...)
	previous := -1
	if index > 0 {
		previous = design.occupied[index-1]
	}
	next := design.n
	if index < len(design.occupied) {
		next = design.occupied[index]
	}
	delete(design.live, [2]int{previous, p})
	delete(design.live, [2]int{p, next})
	if len(design.occupied) > 0 && next-previous >= 2 {
		design.addSegment(previous, next)
	}
}

func (design *ExamRoom) addSegment(l int, r int) {
	if r-l < 2 {
		return // no free seat strictly between
	}
	dist := 0
	spot := 0
	if l == -1 {
		dist, spot = r, 0
	} else if r == design.n {
		dist, spot = design.n-1-l, design.n-1
	} else {
		spot = (l + r) / 2
		dist = (r - l) / 2
	}
	design.live[[2]int{l, r}] = true
	design.heap.push(segment{dist: dist, spot: spot, l: l, r: r})
}
