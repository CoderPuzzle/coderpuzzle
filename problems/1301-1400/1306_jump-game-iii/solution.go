func canReach(arr []int, start int) bool {
	// BFS over indexes: from i, the only successors are i +/- arr[i]. Each
	// index is visited once, so cycles cannot loop forever and a chain of
	// 5*10^4 indexes never touches the recursion stack.
	n := len(arr)
	visited := make([]bool, n)
	queue := []int{start}
	visited[start] = true
	for head := 0; head < len(queue); head++ {
		i := queue[head]
		if arr[i] == 0 {
			return true
		}
		for _, nxt := range []int{i + arr[i], i - arr[i]} {
			if nxt >= 0 && nxt < n && !visited[nxt] {
				visited[nxt] = true
				queue = append(queue, nxt)
			}
		}
	}
	return false
}
