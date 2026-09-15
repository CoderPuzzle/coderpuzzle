import "sort"

func survivedRobotsHealths(positions []int, healths []int, directions string) []int {
	h := make([]int, len(healths))
	copy(h, healths)
	n := len(positions)
	order := make([]int, n)
	for i := range order {
		order[i] = i
	}
	sort.Slice(order, func(a, b int) bool {
		return positions[order[a]] < positions[order[b]]
	})
	// Sweep left to right; every collision is a right-mover meeting a
	// left-mover face to face, so a stack of sweep survivors is the only
	// state needed. Health changes are written into `h` so survivors keep
	// their decremented values.
	stack := []int{}
	for _, idx := range order {
		if directions[idx] == 'R' {
			// Right-movers wait on the stack for someone to hit them.
			stack = append(stack, idx)
		} else {
			// A left-mover duels right-movers off the stack top until it
			// dies or the right-movers run out (same-direction robots ahead
			// can never collide with it).
			alive := true
			for len(stack) > 0 && directions[stack[len(stack)-1]] == 'R' {
				top := stack[len(stack)-1]
				// Weaker top dies; the incoming robot loses 1 health and
				// fights on. Stronger top survives at -1; equal kills both.
				if h[top] < h[idx] {
					h[idx]--
					stack = stack[:len(stack)-1]
				} else if h[top] > h[idx] {
					h[top]--
					alive = false
					break
				} else {
					stack = stack[:len(stack)-1]
					alive = false
					break
				}
			}
			if alive {
				stack = append(stack, idx)
			}
		}
	}
	// Survivors are exactly the stack, but reported in input order.
	survivor := make([]bool, n)
	for _, idx := range stack {
		survivor[idx] = true
	}
	result := []int{}
	for i := 0; i < n; i++ {
		if survivor[i] {
			result = append(result, h[i])
		}
	}
	return result
}
