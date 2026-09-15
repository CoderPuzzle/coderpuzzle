import "math"

func checkContradictions(equations [][]string, values []float64) bool {
	EPS := 1e-5
	id := make(map[string]int)
	parent := make([]int, len(equations)*2)
	weight := make([]float64, len(equations)*2)
	for i := range parent {
		parent[i] = i
		weight[i] = 1.0
	}

	getId := func(s string) int {
		if v, ok := id[s]; ok {
			return v
		}
		fresh := len(id)
		id[s] = fresh
		parent[fresh] = fresh
		weight[fresh] = 1.0
		return fresh
	}

	var find func(x int) (int, float64)
	find = func(x int) (int, float64) {
		if parent[x] == x {
			return x, 1.0
		}
		root, w := find(parent[x])
		parent[x] = root
		weight[x] *= w
		return root, weight[x]
	}

	for i := range equations {
		a := getId(equations[i][0])
		b := getId(equations[i][1])
		w := values[i]
		rootA, wa := find(a)
		rootB, wb := find(b)
		if rootA == rootB {
			if math.Abs(wa/wb-w) > EPS {
				return true
			}
		} else {
			parent[rootA] = rootB
			weight[rootA] = wb * w / wa
		}
	}
	return false
}
