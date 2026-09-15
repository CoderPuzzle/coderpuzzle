func shortestSubarray(nums []int, k int) int {
	n := len(nums)
	// Negatives break the sliding-window trick, so reason in
	// prefix sums: a subarray sum is prefix[i] - prefix[j], and
	// the sentinel prefix[0] = 0 lets subarrays starting at 0
	// compete.
	prefix := make([]int64, n+1)
	for i, x := range nums {
		prefix[i+1] = prefix[i] + int64(x)
	}
	// Slice-based deque of start indices whose prefix sums strictly
	// increase front to back; head indexes the front.
	dq := make([]int, 0, n+1)
	head := 0
	best := n + 1
	for i := 0; i <= n; i++ {
		p := prefix[i]
		// Consume qualifying fronts: each offers length i - front,
		// and popping is safe because later ends only lengthen the
		// same start.
		for head < len(dq) && prefix[dq[head]] <= p-int64(k) {
			if i-dq[head] < best {
				best = i - dq[head]
			}
			head++
		}
		// A later index with an equal-or-smaller prefix dominates
		// as a future start, so trim the tail.
		for head < len(dq) && prefix[dq[len(dq)-1]] >= p {
			dq = dq[:len(dq)-1]
		}
		dq = append(dq, i)
	}
	if best <= n {
		return best
	}
	return -1
}
