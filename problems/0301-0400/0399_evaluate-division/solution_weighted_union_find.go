func calcEquation(equations [][]string, values []float64, queries [][]string) []float64 {
	// Weighted union-find over the variable names: weight[x] always holds
	// x / parent[x], so the product along a parent chain is the member's
	// ratio to its root.
	parent := make(map[string]string)
	weight := make(map[string]float64)
	size := make(map[string]int)
	add := func(node string) {
		if _, ok := parent[node]; !ok {
			parent[node] = node
			weight[node] = 1.0
			size[node] = 1
		}
	}
	// Each stated ratio a / b = v becomes one merge of the two variables.
	for i := range equations {
		a, b := equations[i][0], equations[i][1]
		add(a)
		add(b)
		unite(parent, weight, size, a, b, values[i])
	}

	results := make([]float64, 0, len(queries))
	for _, q := range queries {
		results = append(results, query(parent, weight, q[0], q[1]))
	}
	return results
}

func find(parent map[string]string, weight map[string]float64, x string) (string, float64) {
	// Walk up to the root folding the chain into one node / root product,
	// then re-hang every visited node directly on the root (path
	// compression), each stored weight becoming that product.
	root, product := x, 1.0
	for parent[root] != root {
		product *= weight[root]
		root = parent[root]
	}
	node, quotient := x, product
	for parent[node] != root {
		next := parent[node]
		step := weight[node]
		parent[node] = root
		weight[node] = quotient
		node, quotient = next, quotient/step
	}
	return root, product
}

func unite(parent map[string]string, weight map[string]float64, size map[string]int, a, b string, value float64) {
	// Fold one stated ratio a / b = value into the forest.
	rootA, ratioA := find(parent, weight, a)
	rootB, ratioB := find(parent, weight, b)
	if rootA == rootB {
		// The batch never contradicts itself, so a ratio restating an
		// existing link agrees with the folded product.
		return
	}
	if size[rootA] < size[rootB] {
		// Union by size: hang the smaller tree under the larger.
		rootA, rootB = rootB, rootA
		ratioA, ratioB = ratioB, ratioA
		value = 1.0 / value
	}
	// a = value * b written in root terms, ratioA * rootA =
	// value * ratioB * rootB, solves the new weight rootB / rootA.
	parent[rootB] = rootA
	weight[rootB] = ratioA / (value * ratioB)
	size[rootA] += size[rootB]
}

func query(parent map[string]string, weight map[string]float64, start, end string) float64 {
	// An unknown variable is unanswerable (this also covers x / x for
	// an undefined x); a known variable over itself is 1.0.
	if _, ok := parent[start]; !ok {
		return -1.0
	}
	if _, ok := parent[end]; !ok {
		return -1.0
	}
	rootStart, ratioStart := find(parent, weight, start)
	rootEnd, ratioEnd := find(parent, weight, end)
	if rootStart != rootEnd {
		// Different roots mean no stated ratio links the two groups.
		return -1.0
	}
	return ratioStart / ratioEnd
}
