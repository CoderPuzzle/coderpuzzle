func numberOfSubarrays(nums []int, k int) int {
	n := len(nums)
	// counts[c] = how many earlier prefixes had odd-count c; seeding the
	// empty prefix at 0 makes subarrays starting at index 0 countable.
	counts := make([]int, n+1)
	counts[0] = 1
	odds := 0
	result := 0
	for _, x := range nums {
		// Only parity matters (odd->1, even->0), so "exactly k odds"
		// becomes the classic "subarray with sum exactly k".
		odds += x & 1
		// Every earlier prefix with odds - k pairs with the current one
		// to close one nice subarray; the guard just avoids a negative
		// index before enough odds have accumulated.
		if odds-k >= 0 {
			result += counts[odds-k]
		}
		counts[odds]++
	}
	return result
}
