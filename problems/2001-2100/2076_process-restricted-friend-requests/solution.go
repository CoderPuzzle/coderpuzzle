func friendRequests(n int, restrictions [][]int, requests [][]int) []bool {
	parent := make([]int, n)
	size := make([]int, n)
	for i := range parent {
		parent[i] = i
		size[i] = 1
	}
	find := func(node int) int {
		for parent[node] != node {
			parent[node] = parent[parent[node]]
			node = parent[node]
		}
		return node
	}

	answer := make([]bool, 0, len(requests))
	for _, request := range requests {
		rootU := find(request[0])
		rootV := find(request[1])
		allowed := true
		for _, restriction := range restrictions {
			rootX := find(restriction[0])
			rootY := find(restriction[1])
			if rootX == rootU && rootY == rootV || rootX == rootV && rootY == rootU {
				allowed = false
				break
			}
		}

		answer = append(answer, allowed)
		if allowed && rootU != rootV {
			if size[rootU] < size[rootV] {
				rootU, rootV = rootV, rootU
			}
			parent[rootV] = rootU
			size[rootU] += size[rootV]
		}
	}
	return answer
}
