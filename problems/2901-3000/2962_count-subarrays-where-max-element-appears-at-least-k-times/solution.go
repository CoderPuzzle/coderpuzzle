// A subarray qualifies exactly when it holds >= k copies of M = max(nums).
// Scan right ends, shrink the left end while the window keeps k copies;
// afterwards `left` is the number of start positions that still keep k
// copies for the current right end, so each qualifying subarray is counted
// exactly once, at its right end. Answer peaks at n*(n+1)/2 ~ 5*10^9,
// hence the int64 return.
func countSubarrays(nums []int, k int) int64 {
	m := nums[0]
	for _, value := range nums {
		if value > m {
			m = value
		}
	}
	var answer int64
	left := 0
	count := 0
	for right := 0; right < len(nums); right++ {
		if nums[right] == m {
			count++
		}
		for count == k {
			if nums[left] == m {
				count--
			}
			left++
		}
		answer += int64(left)
	}
	return answer
}
