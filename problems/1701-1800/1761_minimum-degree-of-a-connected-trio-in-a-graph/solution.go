import (
	"math/bits"
	"sort"
)

// A trio's degree is deg(u) + deg(v) + deg(w) - 6: the three internal
// edges are exactly the ones double-counted by vertex degrees. Rank the
// nodes by (degree, id) and keep each node's neighbors as a bitset over
// those ranks; the cheapest trio through an edge (u, v) uses the
// minimum-degree common neighbor, which is the lowest set bit of
// mask[u] & mask[v].
func minTrioDegree(n int, edges [][]int) int {
	deg := make([]int, n+1)
	for _, e := range edges {
		deg[e[0]]++
		deg[e[1]]++
	}

	order := make([]int, n)
	for i := range order {
		order[i] = i + 1
	}
	sort.Slice(order, func(a, b int) bool {
		if deg[order[a]] != deg[order[b]] {
			return deg[order[a]] < deg[order[b]]
		}
		return order[a] < order[b]
	})
	rank := make([]int, n+1)
	degAt := make([]int, n)
	for p, node := range order {
		rank[node] = p
		degAt[p] = deg[node]
	}

	words := (n + 63) / 64
	mask := make([][]uint64, n+1)
	for i := range mask {
		mask[i] = make([]uint64, words)
	}
	for _, e := range edges {
		rv := rank[e[1]]
		ru := rank[e[0]]
		mask[e[0]][rv>>6] |= 1 << (rv & 63)
		mask[e[1]][ru>>6] |= 1 << (ru & 63)
	}

	best := 3 * n
	for _, e := range edges {
		u, v := e[0], e[1]
		for t := 0; t < words; t++ {
			common := mask[u][t] & mask[v][t]
			if common != 0 {
				p := t<<6 + bits.TrailingZeros64(common)
				cand := deg[u] + deg[v] + degAt[p] - 6
				if cand < best {
					best = cand
				}
				break
			}
		}
	}
	if best < 3*n {
		return best
	}
	return -1
}
