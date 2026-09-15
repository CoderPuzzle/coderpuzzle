import "container/list"

type point struct {
	x, y int
}

func minKnightMoves(x int, y int) int {
	// Mirror symmetry folds every target into the first quadrant; a knight
	// never needs to leave the window two squares past it.
	tx, ty := abs(x), abs(y)
	moves := [8][2]int{
		{1, 2}, {2, 1}, {2, -1}, {1, -2},
		{-1, -2}, {-2, -1}, {-2, 1}, {-1, 2},
	}
	seen := map[point]bool{{0, 0}: true}
	queue := list.New()
	queue.PushBack(point{0, 0})
	for steps := 0; queue.Len() > 0; steps++ {
		for s := queue.Len(); s > 0; s-- {
			cur := queue.Remove(queue.Front()).(point)
			if cur.x == tx && cur.y == ty {
				return steps
			}
			for _, m := range moves {
				nx, ny := cur.x+m[0], cur.y+m[1]
				if nx < -2 || nx > tx+2 || ny < -2 || ny > ty+2 {
					continue
				}
				if !seen[point{nx, ny}] {
					seen[point{nx, ny}] = true
					queue.PushBack(point{nx, ny})
				}
			}
		}
	}
	panic("unreachable")
}

func abs(v int) int {
	if v < 0 {
		return -v
	}
	return v
}
