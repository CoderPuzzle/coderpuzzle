func minMoves(nums []int, k int) int {
	if k <= 1 {
		return 0
	}
	pos := make([]int, 0, len(nums))
	for i, v := range nums {
		if v == 1 {
			pos = append(pos, i)
		}
	}
	m := len(pos)
	// q[i] = pos[i] - i shifts the i-th one left past the ones before it,
	// so in q-space every one costs exactly one swap per position moved.
	q := make([]int64, m)
	pref := make([]int64, m+1)
	for i := 0; i < m; i++ {
		q[i] = int64(pos[i] - i)
		pref[i+1] = pref[i] + q[i]
	}
	best := int64(1) << 62
	// The optimal group of k ones is consecutive in pos; gather each window
	// on the median of its q values, which minimizes the total L1 distance.
	for i := 0; i+k <= m; i++ {
		mid := i + k/2
		// Left half pulled onto the median, right half symmetrically, both
		// in O(1) via the prefix sums.
		left := q[mid]*int64(mid-i) - (pref[mid] - pref[i])
		right := (pref[i+k] - pref[mid+1]) - q[mid]*int64(i+k-1-mid)
		cost := left + right
		if cost < best {
			best = cost
		}
	}
	return int(best)
}
