func networkBecomesIdle(edges [][]int, patience []int) int {
	graph := make([][]int, len(patience))
	for _, edge := range edges {
		graph[edge[0]] = append(graph[edge[0]], edge[1])
		graph[edge[1]] = append(graph[edge[1]], edge[0])
	}

	distance := make([]int, len(patience))
	for i := range distance {
		distance[i] = -1
	}
	distance[0] = 0
	queue := []int{0}
	for head := 0; head < len(queue); head++ {
		node := queue[head]
		for _, neighbor := range graph[node] {
			if distance[neighbor] == -1 {
				distance[neighbor] = distance[node] + 1
				queue = append(queue, neighbor)
			}
		}
	}

	var lastArrival int64
	for server := 1; server < len(patience); server++ {
		roundTrip := 2 * int64(distance[server])
		serverPatience := int64(patience[server])
		lastSend := ((roundTrip - 1) / serverPatience) * serverPatience
		if lastSend+roundTrip > lastArrival {
			lastArrival = lastSend + roundTrip
		}
	}
	return int(lastArrival + 1)
}
