func goodIndices(nums []int, k int) []int {
	// Run-length DP: noninc[i] is the longest non-increasing run ending at
	// i; nondec[i] the longest non-decreasing run starting at i. Index i is
	// good exactly when both runs flanking it reach length k:
	// noninc[i-1] >= k covers nums[i-k..i-1], nondec[i+1] >= k covers
	// nums[i+1..i+k]. Two linear sweeps plus one pass over the candidate
	// range replace an O(n*k) window scan.
	n := len(nums)
	noninc := make([]int, n)
	nondec := make([]int, n)
	for i := range noninc {
		noninc[i], nondec[i] = 1, 1
	}
	for i := 1; i < n; i++ {
		if nums[i] <= nums[i-1] {
			noninc[i] = noninc[i-1] + 1
		}
	}
	for i := n - 2; i >= 0; i-- {
		if nums[i] <= nums[i+1] {
			nondec[i] = nondec[i+1] + 1
		}
	}
	good := make([]int, 0, max(0, n-2*k))
	for i := k; i < n-k; i++ {
		if noninc[i-1] >= k && nondec[i+1] >= k {
			good = append(good, i)
		}
	}
	return good
}
