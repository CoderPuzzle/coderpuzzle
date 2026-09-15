// Every good pair's path bends at its lowest common ancestor, so counting
// pairs reduces to counting, at each node, how many ways a leaf on one side
// meets a leaf on the other within budget. Postorder gives each node its
// children's answers first: a table indexed by relative depth (0..distance)
// counting leaves that many edges below. The tree can hold up to 2^10 nodes
// and a skewed instance packs them into one chain, so both the traversal
// and the merge run off explicit stacks instead of the call stack.
func countPairs(root *TreeNode, distance int) int {
	// Build the "root, right, left" visiting order with one stack;
	// reversed, that order is exactly postorder (left, right, root).
	stack := []*TreeNode{root}
	var order []*TreeNode
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		order = append(order, node)
		if node.Left != nil {
			stack = append(stack, node.Left)
		}
		if node.Right != nil {
			stack = append(stack, node.Right)
		}
	}

	answer := 0
	var valueStack [][]int
	for i := len(order) - 1; i >= 0; i-- {
		node := order[i]
		hasLeft := node.Left != nil
		hasRight := node.Right != nil
		if !hasLeft && !hasRight {
			freq := make([]int, distance+1)
			freq[0] = 1
			valueStack = append(valueStack, freq)
			continue
		}

		// Postorder guarantees the right child's table (if any) was
		// pushed most recently, then the left child's.
		var rightFreq, leftFreq []int
		if hasRight {
			rightFreq = valueStack[len(valueStack)-1]
			valueStack = valueStack[:len(valueStack)-1]
		}
		if hasLeft {
			leftFreq = valueStack[len(valueStack)-1]
			valueStack = valueStack[:len(valueStack)-1]
		}

		merged := make([]int, distance+1)
		if hasLeft && hasRight {
			for d1 := 0; d1 <= distance; d1++ {
				if leftFreq[d1] == 0 {
					continue
				}
				budget := distance - d1 - 2
				if budget < 0 {
					continue
				}
				upper := budget
				if upper > distance {
					upper = distance
				}
				for d2 := 0; d2 <= upper; d2++ {
					if rightFreq[d2] != 0 {
						answer += leftFreq[d1] * rightFreq[d2]
					}
				}
			}
			for d := 0; d < distance; d++ {
				merged[d+1] += leftFreq[d] + rightFreq[d]
			}
		} else if hasLeft {
			for d := 0; d < distance; d++ {
				merged[d+1] += leftFreq[d]
			}
		} else {
			for d := 0; d < distance; d++ {
				merged[d+1] += rightFreq[d]
			}
		}
		valueStack = append(valueStack, merged)
	}

	return answer
}
