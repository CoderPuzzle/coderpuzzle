package main

// pending holds, in level order, the nodes that still have a free child
// slot; head indexes its front, so entries leave without shifting.
type CBTInserter struct {
	root    *TreeNode
	pending []*TreeNode
	head    int
}

// NewCBTInserterTyped runs one level-order pass queuing every node that
// still has a free child slot. BFS visits parents left-to-right, so the
// queue front is always the parent of the next complete position.
func NewCBTInserterTyped(root *TreeNode) *CBTInserter {
	inserter := &CBTInserter{root: root}
	queue := []*TreeNode{root}
	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		if node.Left == nil || node.Right == nil {
			inserter.pending = append(inserter.pending, node)
		}
		if node.Left != nil {
			queue = append(queue, node.Left)
		}
		if node.Right != nil {
			queue = append(queue, node.Right)
		}
	}
	return inserter
}

func (design *CBTInserter) insert(v int) int {
	parent := design.pending[design.head]
	node := &TreeNode{Val: v}
	if parent.Left == nil {
		parent.Left = node
	} else {
		parent.Right = node
		design.head++
	}
	design.pending = append(design.pending, node)
	return parent.Val
}

func (design *CBTInserter) get_root() *TreeNode {
	return design.root
}
