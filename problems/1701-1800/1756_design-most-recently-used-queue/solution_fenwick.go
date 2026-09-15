package main

// The line rides a virtual tape: value v starts at tape position v and the
// j-th fetch re-appends its element at position n + j, so tape order is
// always line order. front marks the first live slot of the initial run — a
// sorted hole list remembers the vacated ones — while a Fenwick tree over
// the append stamps counts live elements per position, with a stamp-to-value
// map beside it.
type MRUQueue struct {
	limit   int
	front   int
	holes   []int
	stamps  int
	step    int
	tree    []int
	vals    []int
	fetches int
}

func NewMRUQueueTyped(n int) *MRUQueue {
	stamps := 10000
	step := 1
	for step*2 <= stamps {
		step *= 2
	}
	return &MRUQueue{
		limit:  n,
		front:  1,
		holes:  []int{},
		stamps: stamps,
		step:   step,
		tree:   make([]int, stamps+1),
		vals:   make([]int, stamps+1),
	}
}

func (design *MRUQueue) fetch(k int) int {
	initLive := design.limit - design.front + 1 - len(design.holes)
	var value int
	if k <= initLive {
		lo, hi := design.front, design.limit
		for lo < hi {
			mid := lo + (hi-lo)/2
			if mid-design.front+1-design.holesUpTo(mid) >= k {
				hi = mid
			} else {
				lo = mid + 1
			}
		}
		value = lo
		idx := design.holesUpTo(value)
		design.holes = append(design.holes, 0)
		copy(design.holes[idx+1:], design.holes[idx:])
		design.holes[idx] = value
		for len(design.holes) > 0 && design.holes[0] == design.front {
			design.holes = design.holes[1:]
			design.front++
		}
	} else {
		remaining := k - initLive
		pos := 0
		for hop := design.step; hop > 0; hop >>= 1 {
			next := pos + hop
			if next <= design.stamps && design.tree[next] < remaining {
				pos = next
				remaining -= design.tree[next]
			}
		}
		stamp := pos + 1
		value = design.vals[stamp]
		design.update(stamp, -1)
	}
	design.fetches++
	design.vals[design.fetches] = value
	design.update(design.fetches, 1)
	return value
}

func (design *MRUQueue) holesUpTo(bound int) int {
	lo, hi := 0, len(design.holes)
	for lo < hi {
		mid := (lo + hi) / 2
		if design.holes[mid] <= bound {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	return lo
}

func (design *MRUQueue) update(stamp int, delta int) {
	for ; stamp <= design.stamps; stamp += stamp & -stamp {
		design.tree[stamp] += delta
	}
}
