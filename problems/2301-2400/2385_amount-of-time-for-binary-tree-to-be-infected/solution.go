func amountOfTime(root *TreeNode, start int) int {
	// Infection crosses one edge per minute in both directions, so the
	// answer is the maximum distance from `start` once parent edges are
	// added. BFS layers off an adjacency map measure it.
	adj := map[int][]int{}
	link := func(a, b int) {
		adj[a] = append(adj[a], b)
		adj[b] = append(adj[b], a)
	}
	stack := []*TreeNode{root}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if node == nil {
			continue
		}
		if node.Left != nil {
			link(node.Val, node.Left.Val)
			stack = append(stack, node.Left)
		}
		if node.Right != nil {
			link(node.Val, node.Right.Val)
			stack = append(stack, node.Right)
		}
	}
	seen := map[int]bool{start: true}
	frontier := []int{start}
	minutes := 0
	for len(frontier) > 0 {
		next := []int{}
		for _, u := range frontier {
			for _, v := range adj[u] {
				if !seen[v] {
					seen[v] = true
					next = append(next, v)
				}
			}
		}
		if len(next) == 0 {
			break
		}
		minutes++
		frontier = next
	}
	return minutes
}
