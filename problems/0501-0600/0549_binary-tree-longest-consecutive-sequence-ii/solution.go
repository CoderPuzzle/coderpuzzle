// The runs topping out at a node — the longest +1-downward and the
// longest -1-downward — together with that node's value.
type run struct {
	inc int
	dec int
	val int
}

// An absent child is a run of length 0; a real run always has
// inc >= 1, so the 0 flags it.
var empty = run{}

// A node under judgement: which child remains to visit (0 = left pending,
// 1 = right pending, 2 = ready to judge) plus the child runs collected.
type frame struct {
	node  *TreeNode
	state int
	left  run
	right run
}

func longestConsecutive(root *TreeNode) int {
	// Post-order, one pass: every node reports the pair of runs that top
	// out at it — the longest whose values step +1 downward away from
	// the node (inc) and the longest stepping -1 (dec). A child valued
	// exactly node.val + 1 extends inc with its own inc, one valued
	// node.val - 1 extends dec, and any other child extends nothing. A
	// valid path is monotone, so it turns at exactly one node — the
	// topmost node of the path, one arm descending into each child
	// subtree — and its length there is inc + dec - 1; the answer is the
	// maximum of that over all nodes. The traversal carries its own
	// stack of frames so a single 3*10^4-node chain never strains the
	// goroutine call stack.
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
			value := node.Val
			inc, dec := 1, 1
			for _, child := range []run{left, right} {
				// The child's value picks the run it extends; its
				// report says by how much.
				if child.inc > 0 {
					if child.val == value+1 && child.inc+1 > inc {
						inc = child.inc + 1
					}
					if child.val == value-1 && child.dec+1 > dec {
						dec = child.dec + 1
					}
				}
			}
			if inc+dec-1 > best {
				best = inc + dec - 1
			}
			report := run{inc: inc, dec: dec, val: value}
			if len(stack) > 0 {
				parent := &stack[len(stack)-1]
				if parent.state == 1 {
					parent.left = report
				} else {
					parent.right = report
				}
			}
		}
	}
	return best
}
