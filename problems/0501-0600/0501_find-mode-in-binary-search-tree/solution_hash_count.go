import "sort"

func findMode(root *TreeNode) []int {
	// Counting modes never needed the BST ordering: the modes are a
	// property of the multiset of values, whatever order a walk meets
	// them in. So this version takes the tree as an ordinary container —
	// a stack pops a node, tallies its value into a map keyed by the
	// value itself, and pushes the children — and the map, not adjacency,
	// does the bookkeeping. The walk stays iterative so a single
	// 10^4-node chain never strains the goroutine call stack.
	counts := make(map[int]int)
	stack := []*TreeNode{}
	if root != nil {
		stack = append(stack, root)
	}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		counts[node.Val]++
		if node.Right != nil {
			stack = append(stack, node.Right)
		}
		if node.Left != nil {
			stack = append(stack, node.Left)
		}
	}

	// One pass over the map finds the largest count; a second collects
	// every value that reaches it. A Go map iterates in arbitrary order —
	// the ascending order the streak walk gets for free from inorder is
	// absent here — so the survivors are sorted once at the end.
	best := 0
	for _, count := range counts {
		if count > best {
			best = count
		}
	}
	modes := []int{}
	for value, count := range counts {
		if count == best {
			modes = append(modes, value)
		}
	}
	sort.Ints(modes)
	return modes
}
