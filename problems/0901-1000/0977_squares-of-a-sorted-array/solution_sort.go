import "sort"

// The direct reading the follow-up names: square every element in place,
// then let the language's sort produce the order. The input's own
// arrangement is never consulted — squaring kills the sign, so negatives
// need no case of their own.
func sortedSquares(nums []int) []int {
	squares := make([]int, len(nums))
	for i, value := range nums {
		squares[i] = value * value
	}
	sort.Ints(squares)
	return squares
}
