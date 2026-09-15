import "sort"

func findItinerary(tickets [][]string) []string {
	graph := make(map[string][]string)
	for _, ticket := range tickets {
		graph[ticket[0]] = append(graph[ticket[0]], ticket[1])
	}
	for airport := range graph {
		adj := graph[airport]
		sort.Sort(sort.Reverse(sort.StringSlice(adj)))
	}

	// Iterative Hierholzer: always take the lexicographically smallest
	// unused ticket (last element of the descending-sorted list).
	route := []string{}
	stack := []string{"JFK"}
	for len(stack) > 0 {
		airport := stack[len(stack)-1]
		if adj := graph[airport]; len(adj) > 0 {
			next := adj[len(adj)-1]
			graph[airport] = adj[:len(adj)-1]
			stack = append(stack, next)
		} else {
			// No unused edges left: emit in postorder so dead-end
			// airports land at their latest possible position.
			route = append(route, airport)
			stack = stack[:len(stack)-1]
		}
	}
	for i, j := 0, len(route)-1; i < j; i, j = i+1, j-1 {
		route[i], route[j] = route[j], route[i]
	}
	return route
}
