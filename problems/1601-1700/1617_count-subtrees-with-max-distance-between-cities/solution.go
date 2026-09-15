import "math/bits"

func countSubtreesForEachDiameter(n int, edges [][]int) []int {
	adj := make([][]int, n+1)
	for _, e := range edges {
		u, v := e[0], e[1]
		adj[u] = append(adj[u], v)
		adj[v] = append(adj[v], u)
	}

	farthestWithin := func(start, mask int) (int, int, int) {
		dist := make(map[int]int)
		dist[start] = 0
		queue := []int{start}
		farNode, farDist := start, 0
		for head := 0; head < len(queue); head++ {
			node := queue[head]
			for _, nxt := range adj[node] {
				if (mask>>(nxt-1))&1 == 1 {
					if _, seen := dist[nxt]; !seen {
						dist[nxt] = dist[node] + 1
						if dist[nxt] > farDist {
							farNode, farDist = nxt, dist[nxt]
						}
						queue = append(queue, nxt)
					}
				}
			}
		}
		return farNode, farDist, len(dist)
	}

	ans := make([]int, n-1)
	for mask := 1; mask < (1 << n); mask++ {
		size := bits.OnesCount(uint(mask))
		if size < 2 {
			continue
		}
		start := bits.TrailingZeros(uint(mask)) + 1
		far1, _, reached := farthestWithin(start, mask)
		if reached != size {
			continue
		}
		_, diameter, _ := farthestWithin(far1, mask)
		ans[diameter-1]++
	}
	return ans
}
