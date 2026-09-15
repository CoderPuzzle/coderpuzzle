// Scan left to right keeping a stack of settled elements; when the incoming
// value equals the top, merge them into their sum and keep cascading left
// while the new sum equals the new top — the final stack is the answer.
func mergeAdjacent(nums []int) []int64 {
	stack := make([]int64, 0, len(nums))
	for _, value := range nums {
		if len(stack) > 0 && stack[len(stack)-1] == int64(value) {
			merged := stack[len(stack)-1] + int64(value)
			stack = stack[:len(stack)-1]
			for len(stack) > 0 && stack[len(stack)-1] == merged {
				merged += stack[len(stack)-1]
				stack = stack[:len(stack)-1]
			}
			stack = append(stack, merged)
		} else {
			stack = append(stack, int64(value))
		}
	}
	return stack
}
