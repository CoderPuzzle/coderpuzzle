import "math"

// A subtree's verdict: whether it is a BST, its size, and its value range.
type report struct {
	bst  bool
	size int
	min  int
	max  int
}

// An absent child is an empty BST: size 0, and never a violation at its
// parent — the ±sentinel range makes both bounds checks pass.
var empty = report{bst: true, min: math.MaxInt32, max: math.MinInt32}

// A node under judgement: which child remains to visit (0 = left pending,
// 1 = right pending, 2 = ready to judge) plus the child reports collected.
type frame struct {
	node  *TreeNode
	state int
	left  report
	right report
}

func largestBSTSubtree(root *TreeNode) int {
	// Post-order, one pass: every subtree reports whether it is a BST, its
	// size, and its min/max value; a node is a BST exactly when both
	// children are BSTs and left.max < node.val < right.min, so each node
	// is judged from its two child reports alone. The traversal carries
	// its own stack of frames so a single 10^4-node chain never strains
	// the goroutine call stack.
	best := 0
	stack := []frame{}
	if root != nil {
		stack = append(stack, frame{node: root, left: empty, right: empty})
	}
	for len(stack) > 0 {
		top := &stack[len(stack)-1]
		if top.state == 0 {
			top.state = 1
			if top.node.Left != nil {
				stack = append(stack, frame{node: top.node.Left, left: empty, right: empty})
			}
		} else if top.state == 1 {
			top.state = 2
			if top.node.Right != nil {
				stack = append(stack, frame{node: top.node.Right, left: empty, right: empty})
			}
		} else {
			node, left, right := top.node, top.left, top.right
			stack = stack[:len(stack)-1]
			var verdict report
			if left.bst && right.bst && left.max < node.Val && node.Val < right.min {
				size := 1 + left.size + right.size
				if size > best {
					best = size
				}
				verdict = report{
					bst:  true,
					size: size,
					min:  min(node.Val, left.min),
					max:  max(node.Val, right.max),
				}
			} else {
				// Size and range are junk here: the parent sees the
				// false flag first and never reads them.
				verdict = report{bst: false}
			}
			if len(stack) > 0 {
				parent := &stack[len(stack)-1]
				if parent.state == 1 {
					parent.left = verdict
				} else {
					parent.right = verdict
				}
			}
		}
	}
	return best
}
