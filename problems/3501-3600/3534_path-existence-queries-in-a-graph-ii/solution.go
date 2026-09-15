import "sort"

func pathExistenceQueries(n int, nums []int, maxDiff int, queries [][]int) []int {
	// In value-sorted order each node reaches a contiguous range of
	// positions, so the farthest position reachable in k hops composes
	// monotonically and binary lifting on the one-hop reach returns hop
	// counts in O(log n) per query.
	order := make([]int, n)
	for i := range order {
		order[i] = i
	}
	sort.Slice(order, func(a, b int) bool { return nums[order[a]] < nums[order[b]] })
	rank := make([]int, n)
	comp := make([]int, n)
	reach := make([]int, n)
	for pos, node := range order {
		rank[node] = pos
	}
	for pos := 1; pos < n; pos++ {
		comp[pos] = comp[pos-1]
		if nums[order[pos]]-nums[order[pos-1]] > maxDiff {
			comp[pos]++
		}
	}
	for i, j := 0, 0; i < n; i++ {
		if j < i {
			j = i
		}
		for j+1 < n && nums[order[j+1]]-nums[order[i]] <= maxDiff {
			j++
		}
		reach[i] = j
	}

	// up[k][i] = farthest position reachable from i in at most 2^k hops.
	logn := 1
	for 1<<logn < n {
		logn++
	}
	logn++
	up := make([][]int, logn)
	up[0] = reach
	for k := 1; k < logn; k++ {
		up[k] = make([]int, n)
		for i := 0; i < n; i++ {
			up[k][i] = up[k-1][up[k-1][i]]
		}
	}

	answer := make([]int, len(queries))
	for i, q := range queries {
		su, sv := rank[q[0]], rank[q[1]]
		switch {
		case comp[su] != comp[sv]:
			answer[i] = -1
		case su == sv:
			answer[i] = 0
		default:
			if su > sv {
				su, sv = sv, su
			}
			hops := 0
			for k := logn - 1; k >= 0; k-- {
				if up[k][su] < sv {
					su = up[k][su]
					hops += 1 << k
				}
			}
			answer[i] = hops + 1
		}
	}
	return answer
}
