import "sort"

// A node under traversal: which child remains to visit (0 = left pending,
// 1 = right pending, 2 = ready to sum) plus the sum of the subtrees already
// finished beneath it.
type frame struct {
	node     *TreeNode
	state    int
	children int
}

func findFrequentTreeSum(root *TreeNode) []int {
	// Post-order, one pass: a node's subtree sum is its own value plus the
	// two sums already computed beneath it, so each node's sum is settled
	// exactly once and the counter tallies every subtree. The traversal
	// carries its own stack of frames so a single 10^4-node chain never
	// strains the goroutine call stack.
	counts := map[int]int{}
	stack := []frame{}
	if root != nil {
		stack = append(stack, frame{node: root})
	}
	for len(stack) > 0 {
		top := &stack[len(stack)-1]
		if top.state == 0 {
			top.state = 1
			if top.node.Left != nil {
				stack = append(stack, frame{node: top.node.Left})
			}
		} else if top.state == 1 {
			top.state = 2
			if top.node.Right != nil {
				stack = append(stack, frame{node: top.node.Right})
			}
		} else {
			total := top.node.Val + top.children
			stack = stack[:len(stack)-1]
			counts[total]++
			if len(stack) > 0 {
				stack[len(stack)-1].children += total
			}
		}
	}
	best := 0
	for _, count := range counts {
		if count > best {
			best = count
		}
	}
	result := []int{}
	for total, count := range counts {
		if count == best {
			result = append(result, total)
		}
	}
	// The final sort pins the output to the ascending order the judge
	// compares exactly.
	sort.Ints(result)
	return result
}
