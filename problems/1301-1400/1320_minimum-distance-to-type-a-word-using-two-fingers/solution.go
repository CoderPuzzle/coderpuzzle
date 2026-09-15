func minimumDistance(word string) int {
	// dp[o] = cheapest cost of the typed prefix with the resting finger on
	// letter o (o == 26 models the still-unused finger, distance 0).
	dist := func(a, b int) int {
		if a == 26 || b == 26 {
			return 0
		}
		return abs(a/6-b/6) + abs(a%6-b%6)
	}
	const INF = int(^uint(0) >> 1)
	dp := make([]int, 27)
	for i := 1; i < len(word); i++ {
		prev := int(word[i-1] - 'A')
		cur := int(word[i] - 'A')
		step := dist(prev, cur)
		nxt := make([]int, 27)
		for o := range nxt {
			nxt[o] = INF
		}
		for o, cost := range dp {
			if cost == INF {
				continue
			}
			// Move the finger that just typed; the resting finger stays.
			if cost+step < nxt[o] {
				nxt[o] = cost + step
			}
			// The resting finger types cur; prev becomes the new rest.
			if move := cost + dist(o, cur); move < nxt[prev] {
				nxt[prev] = move
			}
		}
		dp = nxt
	}
	best := INF
	for _, cost := range dp {
		if cost < best {
			best = cost
		}
	}
	return best
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
