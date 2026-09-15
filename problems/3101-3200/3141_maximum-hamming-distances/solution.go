func maxHammingDistances(nums []int, m int) []int {
	// HD(x, y) + HD(~x, y) = m, so max distance from x = m - minDist(~x).
	size := 1 << m
	full := size - 1
	dist := make([]int, size)
	for i := range dist {
		dist[i] = size + 1
	}
	queue := make([]int, 0, size)
	seen := make(map[int]bool)
	// Seed every distinct array value as a BFS source at distance 0.
	for _, value := range nums {
		if !seen[value] {
			seen[value] = true
			dist[value] = 0
			queue = append(queue, value)
		}
	}
	// One bit flip = one Hamming step; unit edges make first reach shortest.
	for head := 0; head < len(queue); head++ {
		v := queue[head]
		nd := dist[v] + 1
		for bit := 0; bit < m; bit++ {
			u := v ^ (1 << bit)
			if dist[u] > nd {
				dist[u] = nd
				queue = append(queue, u)
			}
		}
	}
	// The complement's closest element is x's farthest.
	result := make([]int, len(nums))
	for i, x := range nums {
		result[i] = m - dist[full^x]
	}
	return result
}
