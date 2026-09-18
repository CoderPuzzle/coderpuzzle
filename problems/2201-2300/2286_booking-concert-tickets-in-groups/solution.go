package main

type BookMyShow struct {
	n         int
	m         int
	remaining []int // free seats left per row
	sums      []int64
	maxs      []int
}

func NewBookMyShowTyped(n int, m int) *BookMyShow {
	seating := &BookMyShow{
		n:         n,
		m:         m,
		remaining: make([]int, n),
		sums:      make([]int64, 4*n),
		maxs:      make([]int, 4*n),
	}
	for row := range seating.remaining {
		seating.remaining[row] = m
	}
	if n > 0 {
		seating.build(1, 0, n-1)
	}
	return seating
}

func (design *BookMyShow) build(node int, lo int, hi int) {
	if lo == hi {
		design.sums[node] = int64(design.remaining[lo])
		design.maxs[node] = design.remaining[lo]
		return
	}
	mid := (lo + hi) / 2
	design.build(2*node, lo, mid)
	design.build(2*node+1, mid+1, hi)
	design.pull(node)
}

func (design *BookMyShow) pull(node int) {
	design.sums[node] = design.sums[2*node] + design.sums[2*node+1]
	left, right := design.maxs[2*node], design.maxs[2*node+1]
	if right > left {
		design.maxs[node] = right
	} else {
		design.maxs[node] = left
	}
}

func (design *BookMyShow) update(node int, lo int, hi int, index int, value int) {
	if lo == hi {
		design.remaining[index] = value
		design.sums[node] = int64(value)
		design.maxs[node] = value
		return
	}
	mid := (lo + hi) / 2
	if index <= mid {
		design.update(2*node, lo, mid, index, value)
	} else {
		design.update(2*node+1, mid+1, hi, index, value)
	}
	design.pull(node)
}

func (design *BookMyShow) rangeSum(node int, lo int, hi int, left int, right int) int64 {
	if right < lo || hi < left {
		return 0
	}
	if left <= lo && hi <= right {
		return design.sums[node]
	}
	mid := (lo + hi) / 2
	return design.rangeSum(2*node, lo, mid, left, right) +
		design.rangeSum(2*node+1, mid+1, hi, left, right)
}

// firstAtLeast: smallest index in [left, right] with remaining >= k, or -1.
func (design *BookMyShow) firstAtLeast(node int, lo int, hi int, left int, right int, k int) int {
	if right < lo || hi < left || design.maxs[node] < k {
		return -1
	}
	if lo == hi {
		return lo
	}
	mid := (lo + hi) / 2
	if found := design.firstAtLeast(2*node, lo, mid, left, right, k); found != -1 {
		return found
	}
	return design.firstAtLeast(2*node+1, mid+1, hi, left, right, k)
}

func (design *BookMyShow) gather(k int, lastRow int) []int {
	row := design.firstAtLeast(1, 0, design.n-1, 0, lastRow, k)
	if row == -1 {
		return []int{}
	}
	column := design.m - design.remaining[row]
	design.update(1, 0, design.n-1, row, design.remaining[row]-k)
	return []int{row, column}
}

func (design *BookMyShow) scatter(k int, lastRow int) bool {
	if design.rangeSum(1, 0, design.n-1, 0, lastRow) < int64(k) {
		return false
	}
	row := 0
	for k > 0 {
		row = design.firstAtLeast(1, 0, design.n-1, row, lastRow, 1)
		take := design.remaining[row]
		if k < take {
			take = k
		}
		k -= take
		design.update(1, 0, design.n-1, row, design.remaining[row]-take)
		row++
	}
	return true
}
