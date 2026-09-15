func weightedSum(parent []int, nums []int) int64 {
	n := len(parent)
	children := make([][]int, n)
	for i := 1; i < n; i++ {
		children[parent[i]] = append(children[parent[i]], i)
	}

	depth := make([]int, n)
	queue := make([]int, 0, n)
	depth[0] = 1
	queue = append(queue, 0)
	for head := 0; head < len(queue); head++ {
		node := queue[head]
		for _, child := range children[node] {
			depth[child] = depth[node] + 1
			queue = append(queue, child)
		}
	}

	height := 0
	for _, d := range depth {
		if d > height {
			height = d
		}
	}

	var total int64
	for i := 0; i < n; i++ {
		total += int64(nums[i]) * int64(height-depth[i]+1)
	}
	return total
}
