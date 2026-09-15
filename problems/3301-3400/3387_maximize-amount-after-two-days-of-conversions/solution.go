// Day 1 ends holding some intermediate currency c, and day 2 converts c
// back to initialCurrency. Rates are consistent (no contradictions), so
// the first BFS visit to a currency already carries its maximum amount:
// day 1 is one BFS from initialCurrency (forward edges multiply by the
// rate, reverse edges divide by it), and day 2 reruns the same BFS from
// every currency reached on day 1, carrying that currency's amount. The
// answer is the largest amount of initialCurrency any of those searches
// ends with.
func maxAmount(initialCurrency string, pairs1 [][]string, rates1 []float64, pairs2 [][]string, rates2 []float64) float64 {
	ids := map[string]int{}
	intern := func(name string) int {
		if id, ok := ids[name]; ok {
			return id
		}
		id := len(ids)
		ids[name] = id
		return id
	}
	type edge struct {
		target  int
		rate    float64
		forward bool
	}
	build := func(pairs [][]string, rates []float64) [][]edge {
		graph := make([][]edge, len(ids))
		for i := range pairs {
			start := intern(pairs[i][0])
			target := intern(pairs[i][1])
			for len(graph) < len(ids) {
				graph = append(graph, nil)
			}
			graph[start] = append(graph[start], edge{target, rates[i], true})
			graph[target] = append(graph[target], edge{start, rates[i], false})
		}
		return graph
	}
	// initialCurrency is registered first: it may appear in no pair.
	source := intern(initialCurrency)
	day1 := build(pairs1, rates1)
	day2 := build(pairs2, rates2)
	n := len(ids)
	// Amounts are always positive, so -1 marks "not visited yet".
	day1Amount := make([]float64, n)
	for i := range day1Amount {
		day1Amount[i] = -1
	}
	order := []int{source}
	day1Amount[source] = 1.0
	for head := 0; head < len(order); head++ {
		for _, edge := range day1[order[head]] {
			if day1Amount[edge.target] >= 0 {
				continue
			}
			amount := day1Amount[order[head]]
			if edge.forward {
				day1Amount[edge.target] = amount * edge.rate
			} else {
				day1Amount[edge.target] = amount / edge.rate
			}
			order = append(order, edge.target)
		}
	}
	best := 0.0
	amount := make([]float64, n)
	for _, start := range order {
		for i := range amount {
			amount[i] = -1
		}
		amount[start] = day1Amount[start]
		queue := []int{start}
		for head := 0; head < len(queue); head++ {
			for _, edge := range day2[queue[head]] {
				if amount[edge.target] >= 0 {
					continue
				}
				base := amount[queue[head]]
				if edge.forward {
					amount[edge.target] = base * edge.rate
				} else {
					amount[edge.target] = base / edge.rate
				}
				queue = append(queue, edge.target)
			}
		}
		// Unreached initialCurrency leaves -1, never the maximum.
		if amount[source] > best {
			best = amount[source]
		}
	}
	return best
}
