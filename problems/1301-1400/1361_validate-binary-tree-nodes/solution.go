func validateBinaryTreeNodes(n int, leftChild []int, rightChild []int) bool {
	// At most one parent each, exactly one root, and full reachability from
	// that root: together necessary and sufficient.
	indegree := make([]int, n)
	for _, children := range [][]int{leftChild, rightChild} {
		for _, child := range children {
			if child != -1 {
				indegree[child]++
			}
		}
	}
	root := -1
	roots := 0
	for i, count := range indegree {
		if count == 0 {
			root = i
			roots++
		} else if count > 1 {
			return false
		}
	}
	if roots != 1 {
		return false
	}
	seen := make([]bool, n)
	seen[root] = true
	queue := []int{root}
	visited := 1
	for head := 0; head < len(queue); head++ {
		node := queue[head]
		for _, child := range []int{leftChild[node], rightChild[node]} {
			if child != -1 && !seen[child] {
				seen[child] = true
				visited++
				queue = append(queue, child)
			}
		}
	}
	return visited == n
}
