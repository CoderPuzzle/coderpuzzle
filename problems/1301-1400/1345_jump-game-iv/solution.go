func minJumps(arr []int) int {
	n := len(arr)
	// Start is already the target.
	if n == 1 {
		return 0
	}
	// One pass groups indices by value so a node's same-value neighbors
	// cost their group size instead of rescanning the array.
	indices := make(map[int][]int)
	for i, value := range arr {
		indices[value] = append(indices[value], i)
	}
	// BFS over the implicit graph (edges i-1, i+1, same-value) gives the
	// minimum step count; -1 doubles as the visited marker.
	dist := make([]int, n)
	for i := range dist {
		dist[i] = -1
	}
	dist[0] = 0
	queue := []int{0}
	for head := 0; head < len(queue); head++ {
		i := queue[head]
		d := dist[i] + 1
		nexts := []int{i - 1, i + 1}
		nexts = append(nexts, indices[arr[i]]...)
		// Delete the group after use: every index in it just became visited
		// at the same distance, so it can never again produce an unvisited
		// neighbor — without this, all-equal arrays go quadratic.
		delete(indices, arr[i])
		for _, j := range nexts {
			// Bounds check filters i-1 < 0 and i+1 >= n.
			if j >= 0 && j < n && dist[j] == -1 {
				dist[j] = d
				// The search ends the moment the last index is labeled.
				if j == n-1 {
					return d
				}
				queue = append(queue, j)
			}
		}
	}
	return dist[n-1]
}
