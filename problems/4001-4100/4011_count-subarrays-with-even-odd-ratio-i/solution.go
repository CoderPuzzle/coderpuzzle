func countRatioSubarrays(nums []int, a int, b int) int64 {
	// Only element parity matters. Fix the left endpoint and extend the
	// right endpoint, carrying running even/odd counts so every subarray
	// is tested exactly once with its exact counts.
	var total int64
	n := len(nums)
	for left := 0; left < n; left++ {
		even := 0
		odd := 0
		for right := left; right < n; right++ {
			if nums[right]%2 == 0 {
				even++
			} else {
				odd++
			}
			// Valid iff y > 0 and x/y <= a/b; with positive denominators
			// that is exactly b*even <= a*odd.
			if odd > 0 && int64(b)*int64(even) <= int64(a)*int64(odd) {
				total++
			}
		}
	}
	return total
}
