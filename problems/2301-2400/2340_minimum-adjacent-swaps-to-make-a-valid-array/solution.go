func minimumSwaps(nums []int) int {
	n := len(nums)
	i := 0
	for k := 1; k < n; k++ {
		if nums[k] < nums[i] {
			i = k
		}
	}
	j := n - 1
	for k := n - 2; k >= 0; k-- {
		if nums[k] > nums[j] {
			j = k
		}
	}
	answer := i + (n - 1 - j)
	if j < i {
		answer--
	}
	return answer
}
