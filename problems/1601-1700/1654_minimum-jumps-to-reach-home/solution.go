// Treat the line as a graph whose nodes are (position, back) pairs, back
// marking that the previous jump went backward — the state that forbids
// a second consecutive backward jump. Breadth-first search by jump count
// reaches home in the fewest jumps; the line only needs to be explored
// up to max(x, max(forbidden)) + a + b, because above that line there is
// nothing to land on that matters, and each backward jump must be paid
// for by a following forward jump, so a useful overshoot tops out one
// forward step plus one backward reach higher.
func minimumJumps(forbidden []int, a int, b int, x int) int {
	highest := x
	for _, position := range forbidden {
		if position > highest {
			highest = position
		}
	}
	limit := highest + a + b
	blocked := make([]bool, limit+1)
	for _, position := range forbidden {
		blocked[position] = true
	}
	// seen[position][back] — back == 1 means the previous jump was backward
	seen := make([][2]bool, limit+1)
	seen[0][0] = true
	frontier := [][2]int{{0, 0}}
	jumps := 0
	for len(frontier) > 0 {
		next := [][2]int{}
		for _, state := range frontier {
			position, back := state[0], state[1]
			if position == x {
				return jumps
			}
			forward := position + a
			if forward <= limit && !blocked[forward] && !seen[forward][0] {
				seen[forward][0] = true
				next = append(next, [2]int{forward, 0})
			}
			if back == 0 {
				backward := position - b
				if backward >= 0 && !blocked[backward] && !seen[backward][1] {
					seen[backward][1] = true
					next = append(next, [2]int{backward, 1})
				}
			}
		}
		frontier = next
		jumps++
	}
	return -1
}
