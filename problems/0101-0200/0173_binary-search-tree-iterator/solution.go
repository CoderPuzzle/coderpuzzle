package main

type BSTIterator struct {
	stack []*TreeNode
}

func NewBSTIteratorTyped(root *TreeNode) *BSTIterator {
	iterator := &BSTIterator{}
	iterator.pushSpine(root)
	return iterator
}

// pushSpine pushes a node's left spine: everything on this path is smaller
// than what lies below it, so the last one pushed is the next value in
// order. The stack holds exactly one root-to-node path (O(h) memory).
func (design *BSTIterator) pushSpine(node *TreeNode) {
	for node != nil {
		design.stack = append(design.stack, node)
		node = node.Left
	}
}

func (design *BSTIterator) next() int {
	last := len(design.stack) - 1
	node := design.stack[last]
	design.stack = design.stack[:last]
	// The popped node's right subtree holds the values that come next;
	// its left spine is the front of that block.
	design.pushSpine(node.Right)
	return node.Val
}

func (design *BSTIterator) hasNext() bool {
	return len(design.stack) > 0
}
