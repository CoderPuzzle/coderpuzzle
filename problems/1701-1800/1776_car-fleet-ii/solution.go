func getCollisionTimes(cars [][]int) []float64 {
	n := len(cars)
	answer := make([]float64, n)
	for i := range answer {
		answer[i] = -1
	}
	stack := make([]int, 0, n)
	// Right-to-left scan; the stack holds cars still free-wheeling, the
	// possible first collisions for everything to their left.
	for i := n - 1; i >= 0; i-- {
		position, speed := cars[i][0], cars[i][1]
		// A car at least as fast ahead can never be caught — pop it.
		for len(stack) > 0 && speed <= cars[stack[len(stack)-1]][1] {
			stack = stack[:len(stack)-1]
		}
		for len(stack) > 0 {
			j := stack[len(stack)-1]
			// When i would reach j, assuming j keeps its speed.
			t := float64(cars[j][0]-position) / float64(speed-cars[j][1])
			// If j merges earlier, it has slowed before i arrives: it is
			// no first collision for i (nor for anyone further left), so
			// pop permanently and try the next candidate.
			if answer[j] > 0 && t >= answer[j] {
				stack = stack[:len(stack)-1]
			} else {
				answer[i] = t
				break
			}
		}
		stack = append(stack, i)
	}
	return answer
}
