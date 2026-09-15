import "math"

func checkContradictions(equations [][]string, values []float64) bool {
	EPS := 1e-5
	id := make(map[string]int)
	// Each entry carries its factor as neighbor / name.
	type edge struct {
		to     int
		factor float64
	}
	adj := make([][]edge, len(equations)*2)

	getId := func(s string) int {
		if v, ok := id[s]; ok {
			return v
		}
		fresh := len(id)
		id[s] = fresh
		return fresh
	}

	for i := range equations {
		a := getId(equations[i][0])
		b := getId(equations[i][1])
		w := values[i]
		adj[b] = append(adj[b], edge{a, w})
		adj[a] = append(adj[a], edge{b, 1 / w})
	}

	ratio := make([]float64, len(equations)*2) // 0 marks unvisited; labels are positive
	for root := range ratio {
		if ratio[root] != 0 {
			continue
		}
		ratio[root] = 1.0
		queue := []int{root}
		for head := 0; head < len(queue); head++ {
			x := queue[head]
			for _, e := range adj[x] {
				if ratio[e.to] == 0 {
					ratio[e.to] = ratio[x] * e.factor
					queue = append(queue, e.to)
				}
			}
		}
	}

	for i := range equations {
		a := getId(equations[i][0])
		b := getId(equations[i][1])
		w := values[i]
		if math.Abs(ratio[a]/ratio[b]-w) > EPS {
			return true
		}
	}
	return false
}
