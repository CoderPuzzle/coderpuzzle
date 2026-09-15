func minimumCost(source string, target string, original []string, changed []string, cost []int) int64 {
	// A conversion rule is a directed edge in the 26-letter cost graph;
	// the cheapest a->b conversion is the shortest path a->b.
	const INF = int64(1) << 60
	var dist [26][26]int64
	for i := 0; i < 26; i++ {
		for j := 0; j < 26; j++ {
			dist[i][j] = INF
		}
		dist[i][i] = 0
	}
	for e := range original {
		a := int(original[e][0]) - 'a'
		b := int(changed[e][0]) - 'a'
		// Duplicate rules for the same pair just keep the minimum cost.
		if int64(cost[e]) < dist[a][b] {
			dist[a][b] = int64(cost[e])
		}
	}
	// Floyd–Warshall: relax every pair through each intermediate letter.
	for m := 0; m < 26; m++ {
		row := &dist[m]
		for i := 0; i < 26; i++ {
			di := &dist[i]
			dim := di[m]
			if dim == INF {
				continue
			}
			for j := 0; j < 26; j++ {
				if nd := dim + row[j]; nd < di[j] {
					di[j] = nd
				}
			}
		}
	}
	// Matching characters convert for free; one unreachable pair fails all.
	total := int64(0)
	for p := 0; p < len(source); p++ {
		s := int(source[p]) - 'a'
		t := int(target[p]) - 'a'
		if s == t {
			continue
		}
		d := dist[s][t]
		if d == INF {
			return -1
		}
		total += d
	}
	return total
}
