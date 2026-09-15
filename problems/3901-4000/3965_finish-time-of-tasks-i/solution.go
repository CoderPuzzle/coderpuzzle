func finishTime(n int, edges [][]int, baseTime []int) int64 {
	children := make([][]int, n)
	for _, edge := range edges {
		children[edge[0]] = append(children[edge[0]], edge[1])
	}
	finish := make([]int64, n)
	for node := n - 1; node >= 0; node-- {
		if len(children[node]) == 0 {
			finish[node] = int64(baseTime[node])
			continue
		}
		earliest := int64(1 << 62)
		latest := int64(-1 << 62)
		for _, child := range children[node] {
			if finish[child] < earliest {
				earliest = finish[child]
			}
			if finish[child] > latest {
				latest = finish[child]
			}
		}
		ownDuration := latest - earliest + int64(baseTime[node])
		finish[node] = latest + ownDuration
	}
	return finish[0]
}
