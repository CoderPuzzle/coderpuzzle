// The tree arrives clean — the defect exists only after the custom-testing
// step — so the first walk rebuilds it: every node recorded by value, the
// fromNode node's empty right slot pointed at the toNode node. The
// correction is a breadth-first sweep that takes each level right to left,
// marking nodes seen on enqueue and carrying each node's parent alongside
// it. toNode sits right of fromNode on the same depth, so by the time
// fromNode is dequeued its right child is already seen — and no other node
// can pass that test, because in a tree every child is enqueued exactly
// once, by its own parent; only the wired edge breaks that.
func correctBinaryTree(root *TreeNode, fromNode int, toNode int) *TreeNode {
	byValue := map[int]*TreeNode{}
	walk := []*TreeNode{root}
	for len(walk) > 0 {
		node := walk[len(walk)-1]
		walk = walk[:len(walk)-1]
		if node == nil {
			continue
		}
		byValue[node.Val] = node
		walk = append(walk, node.Left, node.Right)
	}
	byValue[fromNode].Right = byValue[toNode]
	type frame struct {
		node   *TreeNode
		parent *TreeNode
	}
	seen := map[*TreeNode]bool{root: true}
	queue := []frame{{node: root, parent: nil}}
	for head := 0; head < len(queue); head++ {
		current := queue[head]
		if current.node.Right != nil && seen[current.node.Right] {
			// detach the offender through the parent beside it
			if current.parent.Left == current.node {
				current.parent.Left = nil
			} else {
				current.parent.Right = nil
			}
			return root
		}
		if current.node.Right != nil {
			seen[current.node.Right] = true
			queue = append(queue, frame{node: current.node.Right, parent: current.node})
		}
		if current.node.Left != nil {
			seen[current.node.Left] = true
			queue = append(queue, frame{node: current.node.Left, parent: current.node})
		}
	}
	return root
}
