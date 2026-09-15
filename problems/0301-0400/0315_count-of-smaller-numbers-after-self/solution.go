func countSmaller(nums []int) []int {
	const offset = 10002 // maps nums[i] in [-10^4, 10^4] to a positive index
	const size = 20005
	bit := make([]int, size+1)

	update := func(i, delta int) {
		for i <= size {
			bit[i] += delta
			i += i & (-i)
		}
	}
	query := func(i int) int {
		total := 0
		for i > 0 {
			total += bit[i]
			i -= i & (-i)
		}
		return total
	}

	result := make([]int, len(nums))
	for k := len(nums) - 1; k >= 0; k-- {
		index := nums[k] + offset
		result[k] = query(index - 1)
		update(index, 1)
	}
	return result
}
