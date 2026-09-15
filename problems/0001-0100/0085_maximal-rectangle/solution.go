// Largest rectangle under one row's histogram: monotonic stack of
// column indices with strictly increasing heights.
func largestArea(heights []int) int {
	n := len(heights)
	stack := make([]int, 0, n+1)
	best := 0
	for i := 0; i <= n; i++ {
		// h = 0 at i == n is a sentinel that flushes whatever remains
		// on the stack at the end of the row.
		h := 0
		if i < n {
			h = heights[i]
		}
		// A shorter bar has arrived: every stack bar taller than h just
		// found its right boundary, the current index i. Strict `>`
		// leaves equal heights on the stack, so the earlier of two
		// equal bars accounts for the full run when finally popped.
		for len(stack) > 0 && heights[stack[len(stack)-1]] > h {
			height := heights[stack[len(stack)-1]]
			stack = stack[:len(stack)-1]
			// Left boundary is the new top (nearest strictly shorter
			// bar), or -1 when the rectangle reaches the start.
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

func maximalRectangle(matrix [][]string) int {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return 0
	}
	rows, cols := len(matrix), len(matrix[0])
	// Every all-ones rectangle has a bottom row, and that row sees a
	// histogram of consecutive-1 column heights; solving largest
	// rectangle once per row and taking the max covers them all.
	heights := make([]int, cols)
	best := 0
	for r := 0; r < rows; r++ {
		// Fold the row in: '1' extends the run, '0' resets to 0 since a
		// rectangle cannot span a zero.
		for c := 0; c < cols; c++ {
			if matrix[r][c] == "1" {
				heights[c]++
			} else {
				heights[c] = 0
			}
		}
		if area := largestArea(heights); area > best {
			best = area
		}
	}
	return best
}
