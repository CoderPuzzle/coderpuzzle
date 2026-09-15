func isArraySpecial(nums []int, queries [][]int) []bool {
	reach := make([]int, len(nums))
	for i := 1; i < len(nums); i++ {
		if nums[i-1]%2 == nums[i]%2 {
			reach[i] = i
		} else {
			reach[i] = reach[i-1]
		}
	}
	answer := make([]bool, len(queries))
	for i, q := range queries {
		answer[i] = reach[q[1]] <= q[0]
	}
	return answer
}
