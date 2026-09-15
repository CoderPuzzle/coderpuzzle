func maximumSubarraySum(nums []int, k int) int64 {
	best := make(map[int64]int64) // value -> minimum prefix sum P[i] for a start i
	best[int64(nums[0])] = 0
	var prefix int64
	found := false
	var ans int64
	n := len(nums)
	for j := 0; j < n; j++ {
		prefix += int64(nums[j]) // P[j+1]
		v := int64(nums[j])
		for _, candidate := range []int64{v - int64(k), v + int64(k)} {
			if b, ok := best[candidate]; ok {
				value := prefix - b
				if !found || value > ans {
					found = true
					ans = value
				}
			}
		}
		if j+1 < n {
			next := int64(nums[j+1])
			if b, ok := best[next]; !ok || prefix < b {
				best[next] = prefix
			}
		}
	}
	if !found {
		return 0
	}
	return ans
}
