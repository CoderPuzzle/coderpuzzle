func coinChange(coins []int, amount int) int {
	// BFS over amounts: level k holds every amount reachable with exactly
	// k coins, so the first time `amount` is dequeued its level is the
	// minimum coin count. visited keeps each amount enqueued once.
	visited := make([]bool, amount+1)
	visited[0] = true
	queue := []int{0}
	level := 0
	for head := 0; head < len(queue); level++ {
		size := len(queue)
		for ; head < size; head++ {
			a := queue[head]
			if a == amount {
				// Level order guarantees no cheaper level exists.
				return level
			}
			for _, c := range coins {
				// Coins may be huge, so test c <= amount - a before adding.
				if c <= amount-a && !visited[a+c] {
					visited[a+c] = true
					queue = append(queue, a+c)
				}
			}
		}
	}
	// The queue drained without ever reaching amount: unmakeable.
	return -1
}
