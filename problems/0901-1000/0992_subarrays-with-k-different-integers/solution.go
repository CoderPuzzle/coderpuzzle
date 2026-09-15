// A window holding exactly k distinct values has no monotone shrink rule —
// it can be too wide or too narrow from either side — but a window holding
// at most t distinct values does. Count the subarrays with at most k
// distinct values, subtract those with at most k-1, and exactly k is what
// remains.
func subarraysWithKDistinct(nums []int, k int) int64 {
	return atMost(nums, k) - atMost(nums, k-1)
}

func atMost(nums []int, limit int) int64 {
	freq := make([]int, len(nums)+1) // values lie in [1, n]
	distinct := 0
	left := 0
	var total int64
	for right, value := range nums {
		if freq[value] == 0 {
			distinct++
		}
		freq[value]++
		for distinct > limit {
			leaving := nums[left]
			freq[leaving]--
			if freq[leaving] == 0 {
				distinct--
			}
			left++
		}
		// every suffix of an at-most window also qualifies, so the window's
		// length counts the subarrays ending at right
		total += int64(right - left + 1)
	}
	return total
}
