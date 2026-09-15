import (
	"sort"
)

func maxRectangleArea(xCoord []int, yCoord []int) int64 {
	// Sweep columns right-to-left. Compress both axes; a candidate
	// rectangle's left edge is two consecutive points (in y order) of one
	// column. The nearest column to the right holding any point with y in
	// [y1, y2] is the only possible right edge: any farther column would
	// keep that nearest point inside or on the border. A min segment tree
	// over compressed y, seeded with column indices as columns are passed,
	// answers "nearest column with a point in y-range [a, b]" as a
	// range-min query. The right column must hold exactly y1 and y2 inside
	// the range (both corners, nothing between or on the border).
	n := len(xCoord)
	xs := append([]int(nil), xCoord...)
	sort.Ints(xs)
	ys := append([]int(nil), yCoord...)
	sort.Ints(ys)
	xu := xs[:0]
	for i, v := range xs {
		if i == 0 || v != xu[len(xu)-1] {
			xu = append(xu, v)
		}
	}
	yu := ys[:0]
	for i, v := range ys {
		if i == 0 || v != yu[len(yu)-1] {
			yu = append(yu, v)
		}
	}
	xs = xu
	ys = yu
	m := len(xs)
	k := len(ys)
	idx := make([]int, n)
	for i := range idx {
		idx[i] = i
	}
	sort.Slice(idx, func(a, b int) bool {
		if xCoord[idx[a]] != xCoord[idx[b]] {
			return xCoord[idx[a]] < xCoord[idx[b]]
		}
		return yCoord[idx[a]] < yCoord[idx[b]]
	})
	var cols [][]int
	p := 0
	for p < n {
		q := p + 1
		for q < n && xCoord[idx[q]] == xCoord[idx[p]] {
			q++
		}
		col := make([]int, 0, q-p)
		for t := p; t < q; t++ {
			col = append(col, sort.SearchInts(ys, yCoord[idx[t]]))
		}
		cols = append(cols, col)
		p = q
	}
	size := 1
	for size < k {
		size *= 2
	}
	inf := m
	tree := make([]int, 2*size)
	for i := range tree {
		tree[i] = inf
	}
	best := int64(-1)
	for c := m - 1; c >= 0; c-- {
		col := cols[c]
		for t := 0; t+1 < len(col); t++ {
			a, b := col[t], col[t+1]
			res := inf
			for l, r := a+size, b+size+1; l < r; l, r = l>>1, r>>1 {
				if l&1 == 1 {
					if tree[l] < res {
						res = tree[l]
					}
					l++
				}
				if r&1 == 1 {
					r--
					if tree[r] < res {
						res = tree[r]
					}
				}
			}
			if res < inf {
				arr := cols[res]
				lo := sort.SearchInts(arr, a)
				hi := sort.SearchInts(arr, b+1)
				if hi-lo == 2 && arr[lo] == a && arr[lo+1] == b {
					area := int64(xs[res]-xs[c]) * int64(ys[b]-ys[a])
					if area > best {
						best = area
					}
				}
			}
		}
		for _, yy := range col {
			for i := yy + size; i > 0 && tree[i] > c; i >>= 1 {
				tree[i] = c
			}
		}
	}
	return best
}
