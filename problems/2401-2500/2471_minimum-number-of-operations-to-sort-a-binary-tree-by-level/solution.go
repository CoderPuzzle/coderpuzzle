import "sort"

func minimumOperations(root *TreeNode) int {
	if root == nil {
		return 0
	}
	total := 0
	queue := []*TreeNode{root}
	for len(queue) > 0 {
		size := len(queue)
		level := make([]int, 0, size)
		for s := 0; s < size; s++ {
			node := queue[s]
			level = append(level, node.Val)
			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
		queue = queue[size:]
		// Minimum swaps to sort this level = sum of (cycle length - 1).
		target := make([]int, len(level))
		copy(target, level)
		sort.Ints(target)
		pos := make(map[int]int, len(level))
		for i, v := range level {
			pos[v] = i
		}
		visited := make([]bool, len(level))
		for i := range level {
			if visited[i] || level[i] == target[i] {
				visited[i] = true
				continue
			}
			j := i
			cycle := 0
			for !visited[j] {
				visited[j] = true
				cycle++
				j = pos[target[j]]
			}
			total += cycle - 1
		}
	}
	return total
}
