func getSumAbsoluteDifferences(nums []int) []int {
	n := len(nums)
	total := 0
	for _, x := range nums {
		total += x
	}
	prefix := 0
	result := make([]int, n)
	for i := 0; i < n; i++ {
		x := nums[i]
		// Sorted order dissolves the absolute values: every element left
		// of i is <= x and every element right of i is >= x, so each side
		// collapses into one signed sum.
		// Left part: x*i - prefix, the sum of the first i elements.
		left := x*i - prefix
		suffix := total - prefix - x
		// Right part: suffix sum - x*(n - i - 1).
		right := suffix - x*(n-i-1)
		// Ties are exact — equal values contribute 0 on either side.
		result[i] = left + right
		prefix += x
	}
	return result
}
