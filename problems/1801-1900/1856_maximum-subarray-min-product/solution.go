func maxSumMinProduct(nums []int) int {
	const mod = 1000000007
	n := len(nums)
	prefix := make([]int64, n+1)
	for i, v := range nums {
		prefix[i+1] = prefix[i] + int64(v)
	}
	var best int64
	stack := make([]int, 0, n) // indices with strictly increasing values
	for i := 0; i <= n; i++ {
		var cur int64
		if i < n {
			cur = int64(nums[i])
		} // else sentinel 0 pops everything
		for len(stack) > 0 && int64(nums[stack[len(stack)-1]]) >= cur {
			m := int64(nums[stack[len(stack)-1]])
			stack = stack[:len(stack)-1]
			left := -1
			if len(stack) > 0 {
				left = stack[len(stack)-1]
			}
			total := prefix[i] - prefix[left+1]
			if m*total > best {
				best = m * total
			}
		}
		if i < n {
			stack = append(stack, i)
		}
	}
	return int(best % mod)
}
