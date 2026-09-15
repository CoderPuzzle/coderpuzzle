func minSwap(nums1 []int, nums2 []int) int {
	const INF = 1 << 30
	n := len(nums1)
	// Only two configurations matter per index — pair kept or
	// swapped — and swap starts at 1: swapping index 0 costs one op.
	keep, swap := 0, 1
	for i := 1; i < n; i++ {
		nkeep, nswap := INF, INF
		a1, b1 := nums1[i-1], nums2[i-1]
		a2, b2 := nums1[i], nums2[i]
		// Natural ordering licenses consistent choices: keep
		// follows keep, swap follows swap (paying one more op).
		if a1 < a2 && b1 < b2 {
			nkeep = min(nkeep, keep)
			nswap = min(nswap, swap+1)
		}
		// Crossed ordering licenses flipping the choice at i
		// relative to i-1.
		if a1 < b2 && b1 < a2 {
			nkeep = min(nkeep, swap)
			nswap = min(nswap, keep+1)
		}
		// Both conditions may hold; solvability guarantees one does.
		keep, swap = nkeep, nswap
	}
	return min(keep, swap)
}
