// intersect() counts DISTINCT shared integers, so each row first collapses
// to a set: [1, 1] and [1, 1] share only the value 1. Pairwise set
// intersections then spell out the edges, and an iterative stack DFS counts
// the components.
func numberOfComponents(properties [][]int, k int) int {
	n := len(properties)
	sets := make([]map[int]bool, n)
	for i, row := range properties {
		values := make(map[int]bool, len(row))
		for _, value := range row {
			values[value] = true
		}
		sets[i] = values
	}
	adjacency := make([][]int, n)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			shared := 0
			for value := range sets[i] {
				if sets[j][value] {
					shared++
				}
			}
			if shared >= k {
				adjacency[i] = append(adjacency[i], j)
				adjacency[j] = append(adjacency[j], i)
			}
		}
	}
	seen := make([]bool, n)
	components := 0
	stack := make([]int, 0, n)
	for start := 0; start < n; start++ {
		if seen[start] {
			continue
		}
		components++
		// Mark on push so a node never enters the stack twice.
		seen[start] = true
		stack = append(stack, start)
		for len(stack) > 0 {
			node := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			for _, neighbor := range adjacency[node] {
				if !seen[neighbor] {
					seen[neighbor] = true
					stack = append(stack, neighbor)
				}
			}
		}
	}
	return components
}
