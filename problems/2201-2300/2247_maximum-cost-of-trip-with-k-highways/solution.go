import (
	"math"
	"math/bits"
)

func maximumCost(n int, highways [][]int, k int) int {
	if k+1 > n {
		return -1
	}
	type edge struct{ u, toll int }
	adj := make([][]edge, n)
	for _, h := range highways {
		a, b, toll := h[0], h[1], h[2]
		adj[a] = append(adj[a], edge{b, toll})
		adj[b] = append(adj[b], edge{a, toll})
	}
	const NEG = math.MinInt32
	dp := make([][]int, 1<<uint(n))
	for mask := range dp {
		dp[mask] = make([]int, n)
		for v := range dp[mask] {
			dp[mask][v] = NEG
		}
	}
	for v := 0; v < n; v++ {
		dp[1<<uint(v)][v] = 0
	}
	best := -1
	for mask := 0; mask < 1<<uint(n); mask++ {
		pc := bits.OnesCount(uint(mask))
		if pc > k+1 {
			continue
		}
		for v := 0; v < n; v++ {
			cur := dp[mask][v]
			if cur == NEG {
				continue
			}
			if pc == k+1 {
				if cur > best {
					best = cur
				}
				continue
			}
			for _, e := range adj[v] {
				if mask&(1<<uint(e.u)) == 0 {
					nxt := cur + e.toll
					nm := mask | (1 << uint(e.u))
					if nxt > dp[nm][e.u] {
						dp[nm][e.u] = nxt
					}
				}
			}
		}
	}
	return best
}
