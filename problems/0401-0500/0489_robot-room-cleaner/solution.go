package main

type Solution struct{}

func (solution *Solution) cleanRoom(sweeper *Robot) {
	dirs := [4][2]int{{-1, 0}, {0, 1}, {1, 0}, {0, -1}} // up, right, down, left
	visited := map[[2]int]bool{{0, 0}: true}
	sweeper.Clean()
	// Iterative spiral DFS (a 100 x 200 grid overflows recursive DFS):
	// a frame is [row, col, entry direction, next relative direction].
	// Invariant: iteration i of the top frame starts with the sweeper
	// facing (entry + i) % 4, and every iteration ends with exactly one
	// TurnRight — either directly (blocked ahead) or deferred, arriving
	// from the child via the back-out sequence below.
	stack := [][]int{{0, 0, 0, 0}}
	for len(stack) > 0 {
		frame := append([]int(nil), stack[len(stack)-1]...)
		row, col, entry, index := frame[0], frame[1], frame[2], frame[3]
		if index == 4 {
			stack = stack[:len(stack)-1]
			if len(stack) > 0 {
				// Back out of the child: about-face, retrace the step,
				// about-face, then the parent's trailing TurnRight into
				// its next direction.
				sweeper.TurnRight()
				sweeper.TurnRight()
				sweeper.Move()
				sweeper.TurnRight()
				sweeper.TurnRight()
				sweeper.TurnRight()
			}
			continue
		}
		face := (entry + index) % 4
		next := [2]int{row + dirs[face][0], col + dirs[face][1]}
		if !visited[next] && sweeper.Move() {
			visited[next] = true
			sweeper.Clean()
			frame[3] = index + 1
			stack[len(stack)-1] = frame
			stack = append(stack, []int{next[0], next[1], face, 0})
		} else {
			sweeper.TurnRight()
			frame[3] = index + 1
			stack[len(stack)-1] = frame
		}
	}
}
