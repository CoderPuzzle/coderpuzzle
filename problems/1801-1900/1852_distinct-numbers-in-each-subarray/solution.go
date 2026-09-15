// One frequency map slides with the window; the running count of values
// whose frequency is nonzero is the answer per window.
func distinctNumbers(nums []int, k int) []int {
	n := len(nums)
	ans := make([]int, n-k+1)
	freq := make(map[int]int, n*2)
	distinct := 0
	for i, v := range nums {
		freq[v]++
		if freq[v] == 1 {
			distinct++
		}
		if i >= k {
			left := nums[i-k]
			freq[left]--
			if freq[left] == 0 {
				distinct--
			}
		}
		if i >= k-1 {
			ans[i-k+1] = distinct
		}
	}
	return ans
}
