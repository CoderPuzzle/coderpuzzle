func canSeePersonsCount(heights []int) []int {
	n := len(heights)
	answer := make([]int, n)
	// Scan right-to-left; the stack holds exactly the people visible to a
	// shorter person arriving from the left (heights increasing top-down).
	stack := make([]int, 0, n)
	for i := n - 1; i >= 0; i-- {
		seen := 0
		// Each popped person is shorter and has only shorter people between
		// themselves and i, so i sees them. Strict < suffices because all
		// heights are distinct.
		for len(stack) > 0 && stack[len(stack)-1] < heights[i] {
			stack = stack[:len(stack)-1]
			seen++
		}
		// If anything remains, its top is the first person right of i taller
		// than i: visible across the popped people, and it blocks everyone
		// beyond it. Popped entries stay discarded -- i shadows them for
		// anyone further left.
		if len(stack) > 0 {
			seen++
		}
		answer[i] = seen
		stack = append(stack, heights[i])
	}
	// Each index is pushed and popped at most once: linear in total.
	return answer
}
