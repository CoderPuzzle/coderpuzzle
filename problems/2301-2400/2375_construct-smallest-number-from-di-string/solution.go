func smallestNumber(pattern string) string {
	n := len(pattern)
	result := make([]byte, 0, n+1)
	stack := make([]byte, 0, n+1)
	for i := 0; i <= n; i++ {
		// Push 1, 2, 3, ... while inside a 'D' run; the run's positions
		// get consecutive digits, the smallest possible pool.
		stack = append(stack, byte('1'+i))
		// An 'I' (or the end) terminates the current 'D' block; popping
		// emits the block's digits in descending order, satisfying 'D'.
		if i == n || pattern[i] == 'I' {
			for len(stack) > 0 {
				result = append(result, stack[len(stack)-1])
				stack = stack[:len(stack)-1]
			}
		}
	}
	return string(result)
}
