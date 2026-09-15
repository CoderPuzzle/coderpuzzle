import "math"

// Bounds: n <= 1000 and nums[i] <= 10^4, so every prefix sum is at most 10^7
// and every subarray value s*(s+1)/2 at most ~5*10^13 — everything lives
// comfortably in an int64.
func minPartitionScore(nums []int, k int) int64 {
	n := len(nums)
	prefix := make([]int64, n+1)
	for i, x := range nums {
		prefix[i+1] = prefix[i] + int64(x)
	}
	value := func(s int64) int64 {
		return s * (s + 1) / 2
	}

	// dp over "exactly j subarrays covering the first i elements".
	// Layer j only needs i in [j, n-k+j]: at least j elements for j
	// blocks, and at least one element per remaining k-j blocks.
	if k == 1 {
		return value(prefix[n])
	}
	prev := make([]int64, n+1)
	cur := make([]int64, n+1)
	for i := 1; i <= n-k+1; i++ {
		prev[i] = value(prefix[i])
	}

	// The cost prev[t] + value(P[i]-P[t]) satisfies the quadrangle
	// inequality because value is convex, so the best split point is
	// non-decreasing in i: search [optLo, optHi] only, and recurse with
	// the found point splitting the candidate range.
	var solve func(lo, hi, optLo, optHi int, prev, cur []int64)
	solve = func(lo, hi, optLo, optHi int, prev, cur []int64) {
		if lo > hi {
			return
		}
		mid := (lo + hi) / 2
		best := int64(math.MaxInt64)
		bestT := optLo
		hiT := min(optHi, mid-1)
		pMid := prefix[mid]
		for t := optLo; t <= hiT; t++ {
			s := pMid - prefix[t]
			if v := prev[t] + s*(s+1)/2; v < best {
				best = v
				bestT = t
			}
		}
		cur[mid] = best
		solve(lo, mid-1, optLo, bestT, prev, cur)
		solve(mid+1, hi, bestT, optHi, prev, cur)
	}

	for j := 2; j <= k; j++ {
		solve(j, n-k+j, j-1, n-k+j-1, prev, cur)
		prev, cur = cur, prev
	}
	return prev[n]
}
