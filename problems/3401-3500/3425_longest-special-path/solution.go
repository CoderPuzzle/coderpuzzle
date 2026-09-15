func longestSpecialPath(edges [][]int, nums []int) []int {
	n := len(nums)
	type pair struct {
		v int
		w int
	}
	adj := make([][]pair, n)
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], pair{e[1], e[2]})
		adj[e[1]] = append(adj[e[1]], pair{e[0], e[2]})
	}

	bestLen := 0
	bestNodes := 1 // a single node is always a valid special path
	var distPath []int
	last := make(map[int]int) // value -> depth of last occurrence
	startDepth := 0
	var lastRestore []int
	var startRestore []int

	// Events on an explicit stack: [node, parent, depth, dist, isExit]
	type event struct {
		u, par, depth, d, isExit int
	}
	st := []event{{0, -1, 0, 0, 0}}
	for len(st) > 0 {
		ev := st[len(st)-1]
		st = st[:len(st)-1]
		if ev.isExit == 1 {
			distPath = distPath[:len(distPath)-1]
			val := nums[ev.u]
			prevLast := lastRestore[len(lastRestore)-1]
			lastRestore = lastRestore[:len(lastRestore)-1]
			if prevLast >= 0 {
				last[val] = prevLast
			} else {
				delete(last, val)
			}
			startDepth = startRestore[len(startRestore)-1]
			startRestore = startRestore[:len(startRestore)-1]
			continue
		}
		// Enter node u.
		u, par, depth, d := ev.u, ev.par, ev.depth, ev.d
		distPath = append(distPath, d)
		val := nums[u]
		prevLast, ok := last[val]
		if !ok {
			prevLast = -1
		}
		lastRestore = append(lastRestore, prevLast)
		startRestore = append(startRestore, startDepth)
		if prevLast >= startDepth {
			startDepth = prevLast + 1
		}
		last[val] = depth
		length := d - distPath[startDepth]
		nodes := depth - startDepth + 1
		if length > bestLen {
			bestLen = length
			bestNodes = nodes
		} else if length == bestLen && nodes < bestNodes {
			bestNodes = nodes
		}
		st = append(st, event{u, par, depth, d, 1})
		for _, p := range adj[u] {
			if p.v != par {
				st = append(st, event{p.v, u, depth + 1, d + p.w, 0})
			}
		}
	}
	return []int{bestLen, bestNodes}
}
