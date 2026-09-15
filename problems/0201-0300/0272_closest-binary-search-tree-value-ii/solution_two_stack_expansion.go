import "math"

func closestKValues(root *TreeNode, target float64, k int) []int {
	// One descent from the root sorts the tree around target. A node at
	// or below target is a candidate predecessor and anything nearer to
	// target on that side lives in its right subtree, so the walk steps
	// right after pushing it; a node above target mirrors onto the
	// successor stack and steps left. Each stack ends with its side's
	// nearest value on top, the rest of the side ordered underneath.
	predecessors := []*TreeNode{}
	successors := []*TreeNode{}
	node := root
	for node != nil {
		if float64(node.Val) <= target {
			predecessors = append(predecessors, node)
			node = node.Right
		} else {
			successors = append(successors, node)
			node = node.Left
		}
	}
	// Each pick pops the nearer top — a tie goes to the predecessor,
	// which holds the smaller value — then restores its stack by pushing
	// the popped node's inner spine: the right edge of a predecessor's
	// left subtree, the left edge of a successor's right subtree. Each
	// side sweeps outward from target one value at a time, so picks come
	// out ordered exactly as the statement pins them.
	result := make([]int, 0, k)
	for i := 0; i < k; i++ {
		takePredecessor := len(successors) == 0 || (len(predecessors) > 0 &&
			math.Abs(float64(predecessors[len(predecessors)-1].Val)-target) <= math.Abs(float64(successors[len(successors)-1].Val)-target))
		if takePredecessor {
			picked := predecessors[len(predecessors)-1]
			predecessors = predecessors[:len(predecessors)-1]
			result = append(result, picked.Val)
			for child := picked.Left; child != nil; child = child.Right {
				predecessors = append(predecessors, child)
			}
		} else {
			picked := successors[len(successors)-1]
			successors = successors[:len(successors)-1]
			result = append(result, picked.Val)
			for child := picked.Right; child != nil; child = child.Left {
				successors = append(successors, child)
			}
		}
	}
	return result
}
