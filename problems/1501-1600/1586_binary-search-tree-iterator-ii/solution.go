package main

type BSTIterator struct {
	values []int
	index  int
}

// NewBSTIteratorTyped runs an iterative in-order traversal (explicit
// stack, so depth never risks the call stack) to collect the ascending
// values once. index points at the current value, starting at -1 for
// "before the first value".
func NewBSTIteratorTyped(root *TreeNode) *BSTIterator {
	iterator := &BSTIterator{index: -1}
	stack := []*TreeNode{}
	node := root
	for len(stack) > 0 || node != nil {
		for node != nil {
			stack = append(stack, node)
			node = node.Left
		}
		last := len(stack) - 1
		node = stack[last]
		stack = stack[:last]
		iterator.values = append(iterator.values, node.Val)
		node = node.Right
	}
	return iterator
}

func (design *BSTIterator) hasNext() bool {
	return design.index+1 < len(design.values)
}

func (design *BSTIterator) next() int {
	design.index++
	return design.values[design.index]
}

func (design *BSTIterator) hasPrev() bool {
	return design.index > 0
}

func (design *BSTIterator) prev() int {
	design.index--
	return design.values[design.index]
}
