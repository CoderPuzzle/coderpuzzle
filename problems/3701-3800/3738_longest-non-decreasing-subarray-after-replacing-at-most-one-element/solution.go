func longestSubarray(nums []int) int {
	n := len(nums)
	// pref[i] is the longest non-decreasing run ending at i; suff[i] is
	// the longest non-decreasing run starting at i.
	pref := make([]int, n)
	suff := make([]int, n)
	for i := range pref {
		pref[i], suff[i] = 1, 1
	}
	for i := 1; i < n; i++ {
		if nums[i-1] <= nums[i] {
			pref[i] = pref[i-1] + 1
		}
	}
	for i := n - 2; i >= 0; i-- {
		if nums[i] <= nums[i+1] {
			suff[i] = suff[i+1] + 1
		}
	}
	// No replacement spent: the best untouched run.
	ans := 0
	for i := 0; i < n; i++ {
		ans = max(ans, pref[i], suff[i])
	}
	// Replace nums[p] to extend a single side; the new value is an
	// unbounded integer, so each direction alone is always feasible.
	for p := 1; p < n; p++ {
		ans = max(ans, pref[p-1]+1)
	}
	for p := 0; p+1 < n; p++ {
		ans = max(ans, suff[p+1]+1)
	}
	// Bridging both sides needs a value between the neighbors, which
	// exists exactly when nums[p-1] <= nums[p+1].
	for p := 1; p+1 < n; p++ {
		if nums[p-1] <= nums[p+1] {
			ans = max(ans, pref[p-1]+suff[p+1]+1)
		}
	}
	return ans
}
