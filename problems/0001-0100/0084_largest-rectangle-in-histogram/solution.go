func largestRectangleArea(heights []int) int {
	n := len(heights)
	// Stack of indices whose heights are strictly increasing. For any
	// bar, the widest full-height rectangle spans the nearest strictly
	// shorter bar on each side; the scan finds both boundaries
	// implicitly. Each index is pushed once and popped at most once,
	// so the nested loop keeps the whole pass linear.
	stack := make([]int, 0, n+1)
	best := 0
	for i := 0; i <= n; i++ {
		// h = 0 at i == n is a sentinel: shorter than everything, it
		// flushes every remaining bar without adding area itself.
		h := 0
		if i < n {
			h = heights[i]
		}
		// A shorter bar has arrived: every stack bar taller than h just
		// found its right boundary, the current index i. Strict `>`
		// leaves equal heights on the stack, so an equal run still
		// computes its full width when finally flushed.
		for len(stack) > 0 && heights[stack[len(stack)-1]] > h {
			height := heights[stack[len(stack)-1]]
			stack = stack[:len(stack)-1]
			// Left boundary is the new top (nearest still strictly
			// shorter bar), or -1 when the rectangle reaches the start.
			left := -1
			if len(stack) > 0 {
				left = stack[len(stack)-1]
			}
			if area := height * (i - left - 1); area > best {
				best = area
			}
		}
		stack = append(stack, i)
	}
	return best
}
