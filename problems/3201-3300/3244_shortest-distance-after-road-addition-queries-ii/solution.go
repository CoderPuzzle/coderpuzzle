func shortestDistanceAfterQueries(n int, queries [][]int) []int {
	// nxt[i] is the next hop from city i on the maintained route. A road
	// (u, v) helps only when u is still on the route and it jumps past
	// nxt[u]; splicing it in retires each leapfrogged city. Retired
	// cities never return, so total work stays linear.
	nxt := make([]int, n-1)
	for i := range nxt {
		nxt[i] = i + 1
	}
	count := n - 1
	answer := []int{}
	for _, query := range queries {
		u, v := query[0], query[1]
		j := nxt[u]
		if j > 0 && j < v {
			for j < v {
				count--
				t := nxt[j]
				nxt[j] = 0
				j = t
			}
			nxt[u] = v
		}
		answer = append(answer, count)
	}
	return answer
}
