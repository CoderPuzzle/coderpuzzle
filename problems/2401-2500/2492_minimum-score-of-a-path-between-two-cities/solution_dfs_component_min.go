// A path may reuse roads, so every road whose two endpoints are
// reachable from city 1 belongs to some valid path. Discover the
// component by walking it: build the adjacency list, flood outward from
// city 1 with an explicit stack, then take the smallest distance among
// the roads the flood reached.
func minScore(n int, roads [][]int) int {
	adjacency := make([][]int, n+1)
	for _, r := range roads {
		adjacency[r[0]] = append(adjacency[r[0]], r[1])
		adjacency[r[1]] = append(adjacency[r[1]], r[0])
	}

	reached := make([]bool, n+1)
	reached[1] = true
	stack := []int{1}
	for len(stack) > 0 {
		city := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		for _, other := range adjacency[city] {
			if !reached[other] {
				reached[other] = true
				stack = append(stack, other)
			}
		}
	}

	best := 1000000000
	for _, r := range roads {
		if reached[r[0]] && r[2] < best {
			best = r[2]
		}
	}
	return best
}
