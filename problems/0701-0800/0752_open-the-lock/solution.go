func openLock(deadends []string, target string) int {
	// BFS over the 10,000 four-digit lock states, one edge per wheel
	// turn: layer order equals turn count, so reaching the target
	// first is optimal.
	dead := map[string]bool{}
	for _, d := range deadends {
		dead[d] = true
	}
	start := "0000"
	// A deadend start means the wheels can never move.
	if dead[start] {
		return -1
	}
	seen := map[string]bool{start: true}
	queue := []string{start}
	steps := 0
	for len(queue) > 0 {
		// Build the next layer: every state in it lies exactly
		// `steps+1` turns from the start.
		next := make([]string, 0, len(queue)*8)
		for _, state := range queue {
			if state == target {
				return steps
			}
			for i := 0; i < 4; i++ {
				for _, delta := range []int{1, -1} {
					// Turn wheel i up or down, wrapping 0..9.
					digit := (int(state[i]-'0') + delta + 10) % 10
					nxt := state[:i] + string(rune('0'+digit)) + state[i+1:]
					// Mark seen at enqueue time so each state enters
					// the queue once; never step on a deadend.
					if !seen[nxt] && !dead[nxt] {
						seen[nxt] = true
						next = append(next, nxt)
					}
				}
			}
		}
		queue = next
		steps++
	}
	// Queue exhausted: every neighbor is seen or dead, so the lock
	// cannot be opened.
	return -1
}
