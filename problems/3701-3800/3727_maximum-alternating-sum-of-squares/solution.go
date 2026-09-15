import "sort"

func maxAlternatingSum(nums []int) int64 {
	// Squares erase signs, so sort the squared magnitudes and put the
	// largest ceil(n / 2) on the plus slots, the rest on minus slots.
	squares := make([]int64, len(nums))
	for index, value := range nums {
		squares[index] = int64(value) * int64(value)
	}
	sort.Slice(squares, func(a, b int) bool { return squares[a] < squares[b] })
	minus := len(nums) / 2
	var score int64
	for index, square := range squares {
		if index < minus {
			score -= square
		} else {
			score += square
		}
	}
	return score
}
