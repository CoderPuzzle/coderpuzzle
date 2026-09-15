func leftmostBuildingQueries(heights []int, queries [][]int) []int {
	n := len(heights)
	// Max segment tree over heights, padded to a power of two: leaves hold
	// heights, each parent the max of its children.
	size := 1
	for size < n {
		size <<= 1
	}
	seg := make([]int64, 2*size)
	for i := 0; i < n; i++ {
		seg[size+i] = int64(heights[i])
	}
	for i := size - 1; i >= 1; i-- {
		seg[i] = max2940(seg[2*i], seg[2*i+1])
	}

	result := make([]int, 0, len(queries))
	// Movements only go rightward and strictly upward in height.
	for _, qr := range queries {
		a, b := qr[0], qr[1]
		if a > b {
			a, b = b, a
		}
		if a == b {
			result = append(result, a)
		} else if heights[a] < heights[b] {
			result = append(result, b)
		} else {
			// The taller building sets the bar both must clear strictly
			// right of b; find the leftmost one above it.
			threshold := int64(heights[a])
			if int64(heights[b]) > threshold {
				threshold = int64(heights[b])
			}
			result = append(result, findFirst2940(seg, 1, 0, size, b+1, n, threshold))
		}
	}
	return result
}

func max2940(a, b int64) int64 {
	if a > b {
		return a
	}
	return b
}

// First index in [ql, qr) whose height exceeds threshold, or -1.
func findFirst2940(seg []int64, node int, nl int, nr int, ql int, qr int, threshold int64) int {
	// Prune any node outside the query range or whose max cannot qualify.
	if nr <= ql || qr <= nl || seg[node] <= threshold {
		return -1
	}
	if nr-nl == 1 {
		return nl
	}
	mid := (nl + nr) / 2
	// Left child first, so the first leaf reached is the leftmost hit.
	res := findFirst2940(seg, 2*node, nl, mid, ql, qr, threshold)
	if res != -1 {
		return res
	}
	return findFirst2940(seg, 2*node+1, mid, nr, ql, qr, threshold)
}
