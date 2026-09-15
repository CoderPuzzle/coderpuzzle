func avoidFlood(rains []int64) []int64 {
	n := len(rains)
	nxt := make([]int, n+2)
	for i := range nxt {
		nxt[i] = i
	}
	find := func(x int) int {
		root := x
		for nxt[root] != root {
			root = nxt[root]
		}
		for nxt[x] != root {
			step := nxt[x]
			nxt[x] = root
			x = step
		}
		return root
	}
	last := make(map[int64]int)
	ans := make([]int64, n)
	for i := range ans {
		ans[i] = -1
	}
	for i := 0; i < n; i++ {
		r := rains[i]
		if r == 0 {
			ans[i] = 1
			continue
		}
		nxt[i] = i + 1
		if prev, seen := last[r]; seen {
			j := find(prev + 1)
			if j >= i {
				return []int64{}
			}
			ans[j] = r
			nxt[j] = j + 1
		}
		last[r] = i
	}
	return ans
}
