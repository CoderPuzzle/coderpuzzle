import "math/bits"

func NewFindElementsTyped(root *TreeNode) *FindElements {
	// Constructor: iterative recovery pass. The root is 0; a child of x
	// is 2x + 1 (left) or 2x + 2 (right), so one BFS fixes every value.
	design := &FindElements{root: root}
	root.Val = 0
	queue := []*TreeNode{root}
	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		if node.Left != nil {
			node.Left.Val = 2*node.Val + 1
			queue = append(queue, node.Left)
		}
		if node.Right != nil {
			node.Right.Val = 2*node.Val + 2
			queue = append(queue, node.Right)
		}
	}
	return design
}

type FindElements struct {
	root *TreeNode
}

// With w = target + 1, stepping left doubles w (append bit 0) and
// stepping right doubles w and adds one (append bit 1), so the bits
// after the leading one, read highest-first, give the moves.
func (design *FindElements) find(target int) bool {
	path := uint32(target) + 1
	node := design.root
	for bit := bits.Len32(path) - 2; bit >= 0 && node != nil; bit-- {
		if path>>uint(bit)&1 == 1 {
			node = node.Right
		} else {
			node = node.Left
		}
	}
	return node != nil
}
