func shortestDistanceColor(colors []int, queries [][]int) []int {
	const INF = 1 << 30
	n := len(colors)
	// dist[i][c]: distance from i to nearest color c (1..3).
	dist := make([][4]int, n)
	for c := 1; c <= 3; c++ {
		// Left-to-right sweep carrying the distance to the most
		// recent occurrence of c.
		last := INF
		for i := 0; i < n; i++ {
			if colors[i] == c {
				last = 0
			} else if last != INF {
				last++
			}
			dist[i][c] = last
		}
		// Mirror sweep keeps whichever side owns the closer one.
		last = INF
		for i := n - 1; i >= 0; i-- {
			if colors[i] == c {
				last = 0
			} else if last != INF {
				last++
			}
			if last < dist[i][c] {
				dist[i][c] = last
			}
		}
	}
	answer := make([]int, len(queries))
	for q, query := range queries {
		d := dist[query[0]][query[1]]
		if d == INF {
			d = -1
		}
		answer[q] = d
	}
	return answer
}
