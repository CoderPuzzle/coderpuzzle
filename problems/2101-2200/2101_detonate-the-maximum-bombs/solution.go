func maximumDetonation(bombs [][]int) int {
	count := len(bombs)
	graph := make([][]int, count)
	for source := 0; source < count; source++ {
		for target := 0; target < count; target++ {
			dx := int64(bombs[source][0] - bombs[target][0])
			dy := int64(bombs[source][1] - bombs[target][1])
			radius := int64(bombs[source][2])
			if dx*dx+dy*dy <= radius*radius {
				graph[source] = append(graph[source], target)
			}
		}
	}

	answer := 0
	for start := 0; start < count; start++ {
		seen := make([]bool, count)
		seen[start] = true
		stack := []int{start}
		reached := 0
		for len(stack) > 0 {
			source := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			reached++
			for _, target := range graph[source] {
				if !seen[target] {
					seen[target] = true
					stack = append(stack, target)
				}
			}
		}
		if reached > answer {
			answer = reached
		}
	}
	return answer
}
