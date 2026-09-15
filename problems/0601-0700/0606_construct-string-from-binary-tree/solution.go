import (
	"strconv"
	"strings"
)

func tree2str(root *TreeNode) string {
	// The answer is a preorder walk written under two paren rules: a node
	// with any child opens a group for it, and a group is dropped only when
	// the child is absent — except that an absent left child beside a
	// present right one leaves its "()" placeholder so the two groups stay
	// tell-apart. The stack interleaves those literal parens with the pending
	// nodes in exactly the order they must be written, so one pop-and-emit
	// loop produces the whole string.
	// Iterative on purpose: the 10'000-node chain the constraints allow nests
	// far deeper than the judge's goroutine stacks may recurse; the explicit
	// stack is one entry per pending node or paren and never nests a call.
	var result strings.Builder
	// An item is a node to write (marker 0) or a literal paren.
	type item struct {
		node   *TreeNode
		marker byte
	}
	stack := []item{{node: root}}
	for len(stack) > 0 {
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if top.node == nil {
			result.WriteByte(top.marker)
			continue
		}
		node := top.node
		result.WriteString(strconv.Itoa(node.Val))
		if node.Left != nil || node.Right != nil {
			if node.Right != nil {
				// The right group is written second, so it is pushed first
				// and pops after the left group is finished.
				stack = append(stack, item{marker: ')'})
				stack = append(stack, item{node: node.Right})
				stack = append(stack, item{marker: '('})
				if node.Left == nil {
					// A right child with no left one: the empty pair marks
					// where the left group would have been.
					result.WriteString("()")
				}
			}
			if node.Left != nil {
				stack = append(stack, item{marker: ')'})
				stack = append(stack, item{node: node.Left})
				stack = append(stack, item{marker: '('})
			}
		}
	}
	return result.String()
}
