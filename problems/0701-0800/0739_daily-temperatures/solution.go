func dailyTemperatures(temperatures []int) []int {
	n := len(temperatures)
	answer := make([]int, n)
	// Stack of days still waiting for a warmer one; their temperatures
	// are non-increasing bottom to top. Unanswered days keep answer 0.
	stack := make([]int, 0, n)
	for day, temp := range temperatures {
		// Strictly warmer today resolves each waiting day on top; equal
		// temperatures leave them waiting (strict < comparison).
		for len(stack) > 0 && temperatures[stack[len(stack)-1]] < temp {
			previous := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			answer[previous] = day - previous
		}
		stack = append(stack, day)
	}
	return answer
}
