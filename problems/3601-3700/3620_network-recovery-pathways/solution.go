import "sort"

func findMaxPathScore(edges [][]int, online []bool, k int64) int {
	n := len(online)
	adj := make([][][2]int, n)
	indeg := make([]int, n)
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], [2]int{e[1], e[2]})
		indeg[e[1]]++
	}

	// Kahn's algorithm: the topological order is computed once and reused
	// by every feasibility check below (the graph is a DAG).
	queue := []int{}
	for i := 0; i < n; i++ {
		if indeg[i] == 0 {
			queue = append(queue, i)
		}
	}
	topo := []int{}
	head := 0
	for head < len(queue) {
		u := queue[head]
		head++
		topo = append(topo, u)
		for _, nb := range adj[u] {
			indeg[nb[0]]--
			if indeg[nb[0]] == 0 {
				queue = append(queue, nb[0])
			}
		}
	}

	// Feasibility is monotone in the threshold (lowering it only adds
	// edges), so binary-search the sorted distinct edge costs for the
	// largest feasible score.
	costSet := map[int]struct{}{}
	for _, e := range edges {
		costSet[e[2]] = struct{}{}
	}
	costs := make([]int, 0, len(costSet))
	for c := range costSet {
		costs = append(costs, c)
	}
	sort.Ints(costs)

	// feasible(s): a path from 0 to n-1 within budget k exists using only
	// edges of cost >= s and only online nodes. The cheapest such path is
	// the right witness, so distances are minimized in topological order.
	feasible := func(s int64) bool {
		const INF = int64(1) << 62
		dist := make([]int64, n)
		for i := range dist {
			dist[i] = INF
		}
		dist[0] = 0
		for _, u := range topo {
			if dist[u] == INF || !online[u] {
				continue
			}
			for _, nb := range adj[u] {
				if int64(nb[1]) >= s && online[nb[0]] {
					nd := dist[u] + int64(nb[1])
					if nd < dist[nb[0]] {
						dist[nb[0]] = nd
					}
				}
			}
		}
		return dist[n-1] <= k
	}

	// If even with every edge allowed no budget-feasible path exists, no
	// score is achievable.
	if !feasible(0) {
		return -1
	}
	if len(costs) == 0 {
		return 0
	}
	lo, hi := 0, len(costs)-1
	ans := costs[0]
	for lo <= hi {
		mid := lo + (hi-lo)/2
		if feasible(int64(costs[mid])) {
			ans = costs[mid]
			lo = mid + 1
		} else {
			hi = mid - 1
		}
	}
	return ans
}
