func largestIsland(grid [][]int) int {
	n := len(grid)
	// Label each 4-connected island with a distinct color and
	// record its size; marking cells as they are pushed finds each
	// island exactly once.
	label := make([][]int, n)
	for i := range label {
		label[i] = make([]int, n)
	}
	sizes := make(map[int]int)

	var flood func(si, sj, color int) int
	flood = func(si, sj, color int) int {
		count := 0
		stack := [][2]int{{si, sj}}
		label[si][sj] = color
		dirs := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
		for len(stack) > 0 {
			top := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			i, j := top[0], top[1]
			count++
			for _, d := range dirs {
				ni, nj := i+d[0], j+d[1]
				if ni >= 0 && ni < n && nj >= 0 && nj < n &&
					grid[ni][nj] == 1 && label[ni][nj] == 0 {
					label[ni][nj] = color
					stack = append(stack, [2]int{ni, nj})
				}
			}
		}
		return count
	}

	color := 0
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] == 1 && label[i][j] == 0 {
				color++
				sizes[color] = flood(i, j, color)
			}
		}
	}

	// Best starts at the largest existing island — also the answer
	// when the grid is all 1s and no 0 exists to flip.
	best := 0
	for _, size := range sizes {
		if size > best {
			best = size
		}
	}
	dirs := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] == 0 {
				// Dedup matters: one island can touch this 0 on
				// several sides, and counting it twice would
				// overstate the merge.
				seen := make(map[int]bool)
				total := 1
				for _, d := range dirs {
					ni, nj := i+d[0], j+d[1]
					if ni >= 0 && ni < n && nj >= 0 && nj < n && label[ni][nj] != 0 {
						c := label[ni][nj]
						if !seen[c] {
							seen[c] = true
							total += sizes[c]
						}
					}
				}
				if total > best {
					best = total
				}
			}
		}
	}
	return best
}
