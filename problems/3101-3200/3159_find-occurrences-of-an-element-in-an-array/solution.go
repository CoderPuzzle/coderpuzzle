// One sweep records every index where x occurs, in order. Query k then
// reads straight off that list: the k-th occurrence exists exactly when
// k does not overrun it. Indices are 1-based ranks into a 0-based list,
// hence the k - 1.
func occurrencesOfElement(nums []int, queries []int, x int) []int {
	positions := make([]int, 0)
	for index := 0; index < len(nums); index++ {
		if nums[index] == x {
			positions = append(positions, index)
		}
	}
	total := len(positions)
	answer := make([]int, len(queries))
	for i := 0; i < len(queries); i++ {
		k := queries[i]
		if k <= total {
			answer[i] = positions[k-1]
		} else {
			answer[i] = -1
		}
	}
	return answer
}
