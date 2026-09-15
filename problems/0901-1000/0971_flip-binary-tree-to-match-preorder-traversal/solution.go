// The walk and the voyage run in lockstep: a preorder descent that consumes
// one voyage value per node and, whenever the next value names the right
// child rather than the left, flips the current node and records it. Values
// are unique, so each flip decision is forced — the recorded set is the
// smallest one, listed in the order the resulting preorder meets the flipped
// nodes. Any disagreement, or voyage entries left over, means no flip set
// works: [-1].
func flipMatchVoyage(root *TreeNode, voyage []int) []int {
	flips := []int{}
	pending := []*TreeNode{}
	if root != nil {
		pending = append(pending, root)
	}
	cursor := 0
	for len(pending) > 0 {
		node := pending[len(pending)-1]
		pending = pending[:len(pending)-1]
		if cursor == len(voyage) || voyage[cursor] != node.Val {
			return []int{-1}
		}
		cursor++
		left, right := node.Left, node.Right
		if left != nil && (cursor == len(voyage) || voyage[cursor] != left.Val) {
			flips = append(flips, node.Val)
			left, right = right, left
		}
		if right != nil {
			pending = append(pending, right)
		}
		if left != nil {
			pending = append(pending, left)
		}
	}
	if cursor != len(voyage) {
		return []int{-1}
	}
	return flips
}
