package main

type Solution struct{}

func (solution *Solution) findMinimumPath(maze *GridMaster) int {
	dirs := []string{"U", "D", "L", "R"}
	dr := []int{-1, 1, 0, 0}
	dc := []int{0, 0, -1, 1}
	back := map[string]string{"U": "D", "D": "U", "L": "R", "R": "L"}

	cost := map[int64]int{cellKey(0, 0): 0}
	foundTarget := false
	goalR, goalC := 0, 0
	if maze.IsTarget() {
		foundTarget = true
	}

	// Iterative DFS keeps the walker physically on the DFS tree: move to a
	// child when pushing, move back when popping. Each discovered cell
	// records the toll Move() reported on entering it.
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
			if maze.CanMove(direction) {
				nk := cellKey(nr, nc)
				if _, ok := cost[nk]; !ok {
					cost[nk] = maze.Move(direction)
					if maze.IsTarget() {
						foundTarget = true
						goalR, goalC = nr, nc
					}
					top.next = idx
					stack = append(stack, frame{nr, nc, 0})
					parentDirs = append(parentDirs, idx-1)
					pushed = true
					break
				}
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

	if !foundTarget {
		return -1
	}
	// Dijkstra over the surveyed tolls, on a hand-rolled binary min-heap of
	// packed (toll, key) records — the interactive wrapper allows no imports.
	dist := map[int64]int{cellKey(0, 0): 0}
	heap := []uint64{uint64(0)<<32 | uint64(cellKey(0, 0))}
	push := func(entry uint64) {
		heap = append(heap, entry)
		i := len(heap) - 1
		for i > 0 {
			parent := (i - 1) / 2
			if heap[parent]>>32 <= heap[i]>>32 {
				break
			}
			heap[parent], heap[i] = heap[i], heap[parent]
			i = parent
		}
	}
	pop := func() uint64 {
		top := heap[0]
		last := heap[len(heap)-1]
		heap = heap[:len(heap)-1]
		if len(heap) > 0 {
			heap[0] = last
			i := 0
			for {
				left, right, smallest := 2*i+1, 2*i+2, i
				if left < len(heap) && heap[left]>>32 < heap[smallest]>>32 {
					smallest = left
				}
				if right < len(heap) && heap[right]>>32 < heap[smallest]>>32 {
					smallest = right
				}
				if smallest == i {
					break
				}
				heap[smallest], heap[i] = heap[i], heap[smallest]
				i = smallest
			}
		}
		return top
	}
	for len(heap) > 0 {
		entry := pop()
		du := int(entry >> 32)
		k := int64(entry & 0xFFFFFFFF)
		if du > dist[k] {
			continue
		}
		r := int(k/256) - 128
		c := int(k%256) - 128
		for i := 0; i < 4; i++ {
			nr, nc := r+dr[i], c+dc[i]
			nk := cellKey(nr, nc)
			if step, ok := cost[nk]; ok {
				nd := du + step
				if known, ok := dist[nk]; !ok || nd < known {
					dist[nk] = nd
					push(uint64(nd)<<32 | uint64(nk))
				}
			}
		}
	}
	if answer, ok := dist[cellKey(goalR, goalC)]; ok {
		return answer
	}
	return -1
}

// cellKey packs relative coordinates into one integer; relative coords
// stay within +/-99, so a 256-wide row stride keeps them apart.
func cellKey(r, c int) int64 {
	return int64(r+128)*256 + int64(c+128)
}
