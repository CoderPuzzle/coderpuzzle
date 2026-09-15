const gateMod int64 = 1000000007

type gateMatrix [4]int64

func gateMultiply(a, b gateMatrix) gateMatrix {
	return gateMatrix{
		(a[0]*b[0] + a[1]*b[2]) % gateMod,
		(a[0]*b[1] + a[1]*b[3]) % gateMod,
		(a[2]*b[0] + a[3]*b[2]) % gateMod,
		(a[2]*b[1] + a[3]*b[3]) % gateMod,
	}
}

func distinctPaths(n int, parent []int, gates, queries [][]int) int {
	levels := 1
	for 1<<levels <= n {
		levels++
	}
	children := make([][]int, n)
	for node := 1; node < n; node++ {
		children[parent[node]] = append(children[parent[node]], node)
	}
	depth := make([]int, n)
	order := []int{0}
	for i := 0; i < len(order); i++ {
		node := order[i]
		for _, child := range children[node] {
			depth[child] = depth[node] + 1
			order = append(order, child)
		}
	}
	up := make([][]int, levels)
	matrices := make([][]gateMatrix, levels)
	for level := 0; level < levels; level++ {
		up[level] = make([]int, n)
		matrices[level] = make([]gateMatrix, n)
		for node := 0; node < n; node++ {
			matrices[level][node] = gateMatrix{1, 0, 0, 1}
		}
	}
	for node := 1; node < n; node++ {
		up[0][node] = parent[node]
		matrices[0][node] = gateMatrix{
			int64(gates[node][1]), int64(gates[node][2]),
			int64(gates[node][2]), int64(gates[node][0]),
		}
	}
	for level := 1; level < levels; level++ {
		for node := 0; node < n; node++ {
			middle := up[level-1][node]
			up[level][node] = up[level-1][middle]
			matrices[level][node] = gateMultiply(
				matrices[level-1][node], matrices[level-1][middle])
		}
	}
	ancestor := func(a, b int) int {
		if depth[a] < depth[b] {
			a, b = b, a
		}
		difference := depth[a] - depth[b]
		for level := 0; level < levels; level++ {
			if difference>>level&1 == 1 {
				a = up[level][a]
			}
		}
		if a == b {
			return a
		}
		for level := levels - 1; level >= 0; level-- {
			if up[level][a] != up[level][b] {
				a, b = up[level][a], up[level][b]
			}
		}
		return up[0][a]
	}
	ways := func(node, card, stop int) int64 {
		value := gateMatrix{1, 0, 0, 1}
		difference := depth[node] - depth[stop]
		for level := levels - 1; level >= 0; level-- {
			if difference>>level&1 == 1 {
				value = gateMultiply(value, matrices[level][node])
				node = up[level][node]
			}
		}
		if card == 0 {
			return (value[0] + value[1]) % gateMod
		}
		return (value[2] + value[3]) % gateMod
	}
	answer := 0
	for _, query := range queries {
		stop := ancestor(query[0], query[2])
		answer ^= int(ways(query[0], query[1], stop) *
			ways(query[2], query[3], stop) % gateMod)
	}
	return answer
}
