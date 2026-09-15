// Window i covers nums[max(0, i - nums[i]) .. i] inclusive, so a running
// prefix sum answers each window in O(1) as prefix[i+1] - prefix[start].
// n <= 100 and nums[i] <= 1000 cap the total at 100 windows * 100
// elements * 1000 = 10^7, well inside int.
func subarraySum(nums []int) int {
	n := len(nums)
	prefix := make([]int, n+1)
	for i, value := range nums {
		prefix[i+1] = prefix[i] + value
	}
	total := 0
	for i, value := range nums {
		start := i - value
		if start < 0 {
			start = 0
		}
		total += prefix[i+1] - prefix[start]
	}
	return total
}
