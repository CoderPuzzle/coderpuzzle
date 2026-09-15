func semiOrderedPermutation(nums []int) int {
	n := len(nums)
	i := 0
	j := 0
	for k := 0; k < n; k++ {
		if nums[k] == 1 {
			i = k
		}
		if nums[k] == n {
			j = k
		}
	}
	answer := i + (n - 1 - j)
	if i > j {
		answer--
	}
	return answer
}
