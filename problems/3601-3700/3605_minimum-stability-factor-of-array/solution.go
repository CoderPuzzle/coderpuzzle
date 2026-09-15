// Binary search on the answer with O(1) range-gcd queries from a sparse
// table, plus a greedy that hits every still-stable window of size k+1 by
// editing its rightmost element (which breaks the maximal run of later
// windows — the classic fixed-length interval point cover).
func minStable(nums []int, maxC int) int {
	n := len(nums)

	// st[k][i] is the gcd of nums[i .. i+2^k-1]; two rows tile any window.
	LOG := 1
	for ; (1 << LOG) <= n; LOG++ {
	}
	st := make([][]int, LOG)
	st[0] = append([]int(nil), nums...)
	for k := 1; k < LOG; k++ {
		half := 1 << (k - 1)
		length := n - (1 << k) + 1
		row := make([]int, length)
		for i := 0; i < length; i++ {
			row[i] = gcd(st[k-1][i], st[k-1][i+half])
		}
		st[k] = row
	}

	rangeGcd := func(left, right int) int {
		k := bitsLen(right-left+1) - 1
		span := 1 << k
		return gcd(st[k][left], st[k][right-span+1])
	}

	// Feasibility for a target length k: every window of size k+1 must be
	// broken. Editing one element to 1 breaks every window containing it,
	// so hitting a window's rightmost element covers the maximal run of
	// later window starts — greedily optimal.
	feasible := func(k int) bool {
		width := k + 1
		if width > n {
			return true
		}
		edits := 0
		covered := -1
		for start := 0; start+width <= n; start++ {
			if start <= covered {
				continue
			}
			if rangeGcd(start, start+width-1) > 1 {
				covered = start + width - 1
				edits++
				if edits > maxC {
					return false
				}
			}
		}
		return true
	}

	lo, hi := 0, n
	for lo < hi {
		mid := (lo + hi) / 2
		if feasible(mid) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}

// bitsLen returns the number of bits needed to represent x (0 for x <= 0).
func bitsLen(x int) int {
	count := 0
	for x > 0 {
		x >>= 1
		count++
	}
	return count
}

func gcd(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
