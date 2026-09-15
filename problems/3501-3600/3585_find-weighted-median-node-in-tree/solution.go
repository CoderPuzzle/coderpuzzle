// Root the tree at 0 with an explicit stack (a 10^5-node chain would
// blow the goroutine stack), recording parent, depth and weighted root
// distance. Binary lifting then answers each query in O(log n): lift
// to the LCA l, take the total path weight tot and the cumulative sum
// acc from u to l. "Sum >= tot/2" is tested as 2 * sum >= tot so no
// halves appear; all distances fit in int64 (n * max_w <= 10^14).
func findMedian(n int, edges [][]int, queries [][]int) []int {
	type edge struct {
		v, w int
	}
	adj := make([][]edge, n)
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], edge{e[1], e[2]})
		adj[e[1]] = append(adj[e[1]], edge{e[0], e[2]})
	}
	parent := make([]int, n)
	depth := make([]int, n)
	dist := make([]int64, n)
	seen := make([]bool, n)
	seen[0] = true
	stack := []int{0}
	for len(stack) > 0 {
		u := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		for _, vw := range adj[u] {
			if !seen[vw.v] {
				seen[vw.v] = true
				parent[vw.v] = u
				depth[vw.v] = depth[u] + 1
				dist[vw.v] = dist[u] + int64(vw.w)
				stack = append(stack, vw.v)
			}
		}
	}
	log := 1
	for 1<<log < n {
		log++
	}
	up := make([][]int, log)
	up[0] = parent
	for k := 1; k < log; k++ {
		up[k] = make([]int, n)
		for v := 0; v < n; v++ {
			up[k][v] = up[k-1][up[k-1][v]]
		}
	}
	answer := make([]int, len(queries))
	for qi, q := range queries {
		a, b := q[0], q[1]
		if a == b {
			// Single-node path: the sum from a to itself (0)
			// already meets half of the zero total, so a is the
			// median.
			answer[qi] = a
			continue
		}
		u, v := a, b
		if depth[u] < depth[v] {
			u, v = v, u
		}
		diff, k := depth[u]-depth[v], 0
		for diff > 0 {
			if diff&1 == 1 {
				u = up[k][u]
			}
			diff >>= 1
			k++
		}
		l := v
		if u != v {
			for kk := log - 1; kk >= 0; kk-- {
				if up[kk][u] != up[kk][v] {
					u = up[kk][u]
					v = up[kk][v]
				}
			}
			l = parent[u]
		}
		tot := dist[a] + dist[b] - 2*dist[l]
		acc := dist[a] - dist[l]
		if 2*acc >= tot {
			// Median on the a -> l stretch. Climb from a while
			// the criterion still fails; the parent of the
			// deepest failing node is the first one that
			// satisfies it.
			x := a
			for kk := log - 1; kk >= 0; kk-- {
				t := up[kk][x]
				if depth[t] >= depth[l] && 2*(dist[a]-dist[t]) < tot {
					x = t
				}
			}
			answer[qi] = parent[x]
		} else {
			// Median on the l -> b stretch. Climb from b while
			// the criterion still holds; the highest such node
			// (never l itself, which failed) is the median.
			x := b
			for kk := log - 1; kk >= 0; kk-- {
				t := up[kk][x]
				if depth[t] > depth[l] && 2*(acc+dist[t]-dist[l]) >= tot {
					x = t
				}
			}
			answer[qi] = x
		}
	}
	return answer
}
