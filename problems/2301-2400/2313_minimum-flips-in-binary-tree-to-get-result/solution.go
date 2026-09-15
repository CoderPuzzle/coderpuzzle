func minimumFlips(root *TreeNode, result bool) int {
	if root == nil {
		return 0
	}
	order := []*TreeNode{root}
	for head := 0; head < len(order); head++ {
		node := order[head]
		if node.Left != nil {
			order = append(order, node.Left)
		}
		if node.Right != nil {
			order = append(order, node.Right)
		}
	}
	n := len(order)
	idx := make(map[*TreeNode]int, n)
	for i, node := range order {
		idx[node] = i
	}
	// t[i] / f[i] = min flips to make subtree i true / false; the pair is
	// the whole DP state, and reverse BFS order finalizes children first
	t := make([]int, n)
	f := make([]int, n)
	for i := n - 1; i >= 0; i-- {
		node := order[i]
		v := node.Val
		if node.Left == nil && node.Right == nil {
			// leaf base: (0, 1) if already true, (1, 0) if already false
			if v == 1 {
				t[i], f[i] = 0, 1
			} else {
				t[i], f[i] = 1, 0
			}
		} else if v == 5 {
			// NOT: swap the single child's two costs
			child := node.Left
			if child == nil {
				child = node.Right
			}
			ci := idx[child]
			t[i], f[i] = f[ci], t[ci]
		} else {
			li := idx[node.Left]
			ri := idx[node.Right]
			lt, lf := t[li], f[li]
			rt, rf := t[ri], f[ri]
			if v == 2 {
				// OR: true if either child is true; false only if both are
				t[i], f[i] = min(lt, rt), lf+rf
			} else if v == 3 {
				// AND: mirror of OR - true needs both children true
				t[i], f[i] = lt+rt, min(lf, rf)
			} else {
				// XOR: true when the children differ, false when they match
				t[i], f[i] = min(lt+rf, lf+rt), min(lt+rt, lf+rf)
			}
		}
	}
	rootIdx := idx[root]
	if result {
		return t[rootIdx]
	}
	return f[rootIdx]
}
