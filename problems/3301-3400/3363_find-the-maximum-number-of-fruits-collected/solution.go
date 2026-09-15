func triangle(m [][]int, swapped bool) int64 {
	// Best walk from the top-right corner, one row per step, staying
	// strictly right of the diagonal, final cell excluded (-1 marks
	// not-yet-reachable cells; values >= 0).
	n := len(m)
	prev := make([]int64, n)
	for j := range prev {
		prev[j] = -1
	}
	prev[n-1] = int64(m[n-1][0])
	if !swapped {
		prev[n-1] = int64(m[0][n-1])
	}
	for i := 1; i < n-1; i++ {
		cur := make([]int64, n)
		for j := range cur {
			cur[j] = -1
		}
		for j := i + 1; j < n; j++ {
			best := prev[j-1]
			if prev[j] > best {
				best = prev[j]
			}
			if j+1 < n && prev[j+1] > best {
				best = prev[j+1]
			}
			if best >= 0 {
				v := int64(m[j][i])
				if !swapped {
					v = int64(m[i][j])
				}
				cur[j] = best + v
			}
		}
		prev = cur
	}
	return prev[n-1]
}

func maxCollectedFruits(fruits [][]int) int64 {
	// Child 1 is pinned to the main diagonal. Children 2 and 3 each
	// walk their own off-diagonal triangle in n-1 steps (their row /
	// column advances one per move, and the diagonal can only be
	// touched by spending every later move on it, which collects
	// nothing), so solve them independently; diagonal cells and the
	// shared final cell are counted once, via the diagonal. Child 3 is
	// child 2 with the grid transposed (swapped reads).
	n := len(fruits)
	var total int64
	for i := 0; i < n; i++ {
		total += int64(fruits[i][i])
	}
	total += triangle(fruits, false)
	total += triangle(fruits, true)
	return total
}
