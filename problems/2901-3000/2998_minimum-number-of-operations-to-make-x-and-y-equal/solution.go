// Values are states and every operation is a unit-cost edge, so BFS layers
// count operations. Only +1 ever raises the value, so a target at or above
// x costs exactly y - x steps; below x, an optimal path never climbs past
// x + (x - y), which the 1 <= x, y <= 10^4 box keeps under 2 * 10^4.
func minimumOperationsToMakeEqual(x, y int) int {
	limit := 20010
	dist := make([]int, limit+1)
	for i := range dist {
		dist[i] = -1
	}
	dist[x] = 0
	queue := []int{x}
	for head := 0; head < len(queue); head++ {
		v := queue[head]
		if v == y {
			return dist[v]
		}
		steps := []int{v - 1, v + 1}
		if v%11 == 0 {
			steps = append(steps, v/11)
		}
		if v%5 == 0 {
			steps = append(steps, v/5)
		}
		for _, nxt := range steps {
			if nxt >= 1 && nxt <= limit && dist[nxt] < 0 {
				dist[nxt] = dist[v] + 1
				queue = append(queue, nxt)
			}
		}
	}
	return dist[y]
}
