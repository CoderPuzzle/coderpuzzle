import "sort"

func countGreatEnoughNodes(root *TreeNode, k int) int {
	// Post-order over an explicit stack: each node yields the sorted list
	// of its subtree's min(size, k) smallest values. The pooled child
	// lists plus the node's own value are sorted and truncated, so a full
	// subtree listing is never needed. The kept list reaches length k
	// exactly when the subtree holds at least k nodes, and its last entry
	// is then the subtree's k-th smallest value counted with multiplicity:
	// the node exceeds it iff at least k actual nodes are strictly smaller
	// — duplicates of the node itself never pass.
	great := 0
	if root == nil {
		return 0
	}
	smallest := make(map[*TreeNode][]int)
	type frame struct {
		node *TreeNode
		done bool
	}
	stack := []frame{{root, false}}
	for len(stack) > 0 {
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if !top.done {
			stack = append(stack, frame{top.node, true})
			if top.node.Left != nil {
				stack = append(stack, frame{top.node.Left, false})
			}
			if top.node.Right != nil {
				stack = append(stack, frame{top.node.Right, false})
			}
			continue
		}
		pooled := []int{top.node.Val}
		for _, child := range [2]*TreeNode{top.node.Left, top.node.Right} {
			if part, ok := smallest[child]; ok {
				pooled = append(pooled, part...)
				delete(smallest, child)
			}
		}
		sort.Ints(pooled)
		if len(pooled) > k {
			pooled = pooled[:k]
		}
		smallest[top.node] = pooled
		if len(pooled) == k && top.node.Val > pooled[k-1] {
			great++
		}
	}
	return great
}
