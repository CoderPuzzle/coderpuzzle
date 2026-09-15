import "sort"

func maxIncreasingGroups(usageLimits []int) int {
	// Strictly increasing lengths force the optimal sizes to be 1..x —
	// trimming a larger group down keeps every condition valid. Number i
	// may appear at most once per group, so across any chosen m groups
	// it supplies at most min(limits[i], m) elements, while the m largest
	// groups (sizes x-m+1..x) demand m*(2*x-m+1)/2. That supply test must
	// hold for EVERY m <= x (the full total alone lies: [4,4,1,1] sums to
	// exactly what four groups need yet cannot staff a 4-group plus a
	// 3-group), and when all of them hold an assignment exists (bipartite
	// feasibility / integral flow). Sort ascending, sweep g[m] =
	// sum(min(v, m)) with a forward pointer, binary search the largest x.
	arr := make([]int, len(usageLimits))
	copy(arr, usageLimits)
	sort.Ints(arr)
	n := len(arr)
	// g[m] <= 10^5 * 10^9 = 10^14 — beyond 32-bit, keep it int64.
	g := make([]int64, n+1)
	p := 0
	for m := 1; m <= n; m++ {
		for p < n && arr[p] < m {
			p++
		}
		// n - p is the count of entries >= m; each adds one element.
		g[m] = g[m-1] + int64(n-p)
	}
	feasible := func(x int) bool {
		for m := 1; m <= x; m++ {
			if g[m] < int64(m)*int64(2*x-m+1)/2 {
				return false
			}
		}
		return true
	}
	lo, hi := 0, n
	for lo < hi {
		mid := (lo + hi + 1) / 2
		if feasible(mid) {
			lo = mid
		} else {
			hi = mid - 1
		}
	}
	return lo
}
