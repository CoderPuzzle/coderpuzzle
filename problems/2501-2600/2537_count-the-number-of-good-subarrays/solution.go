func countGood(nums []int, k int) int64 {
	count := make(map[int]int64)
	var pairs, ans int64
	left := 0
	n := int64(len(nums))
	for right := 0; right < len(nums); right++ {
		x := nums[right]
		// Appending a value already seen c times inside the window forms
		// exactly c new equal pairs; the map plus this running total keep the
		// pair count exact under any window move (hash map because values
		// reach 1e9).
		pairs += count[x]
		count[x]++
		// Window [left, right] has >= k pairs, so it and every extension of
		// it to the right are good: exactly n - right subarrays share this
		// right endpoint and start at left or later.
		for pairs >= int64(k) {
			ans += n - int64(right)
			y := nums[left]
			// The departing value leaves count[y] copies behind, exactly how
			// many pairs its removal destroys.
			count[y]--
			pairs -= count[y]
			left++
		}
	}
	return ans
}
