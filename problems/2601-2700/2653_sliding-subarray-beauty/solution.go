// Values are bounded to [-50, 50], so only the 50 negative values can ever
// be an answer: cnt[v+50] counts copies of the negative value v inside the
// current window. Each answer is found by walking those buckets smallest
// value first until x negatives accumulate (0 when fewer than x).
func getSubarrayBeauty(nums []int, k int, x int) []int {
	cnt := make([]int, 50)
	res := make([]int, len(nums)-k+1)
	for i, v := range nums {
		if v < 0 {
			cnt[v+50]++
		}
		j := i - k
		if j >= 0 && nums[j] < 0 {
			cnt[nums[j]+50]--
		}
		if i >= k-1 {
			// Walk the buckets smallest value first until x negatives
			// have been seen; fewer than x in total means beauty 0.
			rem := x
			beauty := 0
			for d := 0; d < 50 && rem > 0; d++ {
				rem -= cnt[d]
				if rem <= 0 {
					beauty = d - 50
				}
			}
			res[i-k+1] = beauty
		}
	}
	return res
}
