import "math"

func closestKValues(root *TreeNode, target float64, k int) []int {
	// Explicit-stack inorder: the BST flattened to its sorted values, with
	// no recursion that a 10^4-node chain could overflow.
	values := []int{}
	stack := []*TreeNode{}
	node := root
	for len(stack) > 0 || node != nil {
		for node != nil {
			stack = append(stack, node)
			node = node.Left
		}
		node = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		values = append(values, node.Val)
		node = node.Right
	}
	// Over sorted values the distance to target is V-shaped, so the k
	// closest form one window: start at the split and grow it, each step
	// taking the nearer frontier. A tie goes left — the smaller value —
	// so the picks come out in the statement's pinned order directly.
	left := 0
	for left < len(values) && float64(values[left]) < target {
		left++
	}
	right := left
	left--
	result := make([]int, 0, k)
	for i := 0; i < k; i++ {
		if right == len(values) || (left >= 0 && math.Abs(float64(values[left])-target) <= math.Abs(float64(values[right])-target)) {
			result = append(result, values[left])
			left--
		} else {
			result = append(result, values[right])
			right++
		}
	}
	return result
}
