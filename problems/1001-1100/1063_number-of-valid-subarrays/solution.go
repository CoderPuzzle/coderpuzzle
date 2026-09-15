func validSubarrays(nums []int) int64 {
	n := len(nums)
	var total int64
	stack := make([]int, 0, n+1)
	for i := 0; i <= n; i++ {
		current := -1
		if i < n {
			current = nums[i]
		}
		for len(stack) > 0 && nums[stack[len(stack)-1]] > current {
			j := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			total += int64(i - j)
		}
		stack = append(stack, i)
	}
	return total
}
