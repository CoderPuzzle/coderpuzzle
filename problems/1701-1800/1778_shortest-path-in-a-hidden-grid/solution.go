package main

type Solution struct{}

func (solution *Solution) findShortestPath(maze *GridMaster) int {
	dirs := []string{"U", "D", "L", "R"}
	dr := []int{-1, 1, 0, 0}
	dc := []int{0, 0, -1, 1}
	back := map[string]string{"U": "D", "D": "U", "L": "R", "R": "L"}

	seen := map[int64]bool{cellKey(0, 0): true}
	targetKey := int64(-1)
	if maze.IsTarget() {
		targetKey = cellKey(0, 0)
	}

	// Iterative DFS keeps the walker physically on the DFS tree: move to a
	// child when pushing, move back when popping. Each reachable cell is
	// entered exactly once and probed with IsTarget.
	type frame struct{ r, c, next int }
	stack := []frame{{0, 0, 0}}
	parentDirs := []int{-1}
	for len(stack) > 0 {
		top := &stack[len(stack)-1]
		r, c, idx := top.r, top.c, top.next
		pushed := false
		for idx < len(dirs) {
			direction := dirs[idx]
			nr, nc := r+dr[idx], c+dc[idx]
			idx++
			if maze.CanMove(direction) && !seen[cellKey(nr, nc)] {
				maze.Move(direction)
				seen[cellKey(nr, nc)] = true
				if maze.IsTarget() {
					targetKey = cellKey(nr, nc)
				}
				top.next = idx
				stack = append(stack, frame{nr, nc, 0})
				parentDirs = append(parentDirs, idx-1)
				pushed = true
				break
			}
		}
		if !pushed {
			stack = stack[:len(stack)-1]
			parentDir := parentDirs[len(parentDirs)-1]
			parentDirs = parentDirs[:len(parentDirs)-1]
			if len(stack) > 0 && parentDir >= 0 {
				maze.Move(back[dirs[parentDir]])
			}
		}
	}

	if targetKey < 0 {
		return -1
	}
	// Unit edge weights: plain BFS over the discovered map.
	dist := map[int64]int{cellKey(0, 0): 0}
	queue := [][2]int{{0, 0}}
	for head := 0; head < len(queue); head++ {
		r, c := queue[head][0], queue[head][1]
		d := dist[cellKey(r, c)]
		for i := 0; i < 4; i++ {
			nr, nc := r+dr[i], c+dc[i]
			nk := cellKey(nr, nc)
			if seen[nk] {
				if _, ok := dist[nk]; !ok {
					dist[nk] = d + 1
					queue = append(queue, [2]int{nr, nc})
				}
			}
		}
	}
	return dist[targetKey]
}

// cellKey packs relative coordinates into one integer; relative coords
// stay within +/-499, so a 1024-wide row stride keeps them apart.
func cellKey(r, c int) int64 {
	return int64(r+512)*1024 + int64(c+512)
}
