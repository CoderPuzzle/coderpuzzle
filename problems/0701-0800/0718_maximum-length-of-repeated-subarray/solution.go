func findLength(nums1 []int, nums2 []int) int {
	m, n := len(nums1), len(nums2)
	// dp[j] = longest common run starting exactly at nums1[i+1], nums2[j];
	// sweeping i downward keeps row i+1 available when row i is computed.
	dp := make([]int, n+1)
	best := 0
	for i := m - 1; i >= 0; i-- {
		cur := make([]int, n+1)
		for j := n - 1; j >= 0; j-- {
			if nums1[i] == nums2[j] {
				// Match extends the run starting at (i+1, j+1); a mismatch
				// leaves 0 — no shared subarray starts there.
				cur[j] = dp[j+1] + 1
				if cur[j] > best {
					best = cur[j]
				}
			}
		}
		// Roll: only the previous row is ever read.
		dp = cur
	}
	return best
}
