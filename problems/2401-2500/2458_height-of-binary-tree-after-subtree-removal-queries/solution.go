func treeQueries(root *TreeNode, queries []int) []int {
	if root == nil {
		return make([]int, len(queries))
	}

	depth := make(map[int]int)
	height := make(map[int]int)
	submax := make(map[int]int)

	// iterative pre-order for depth + post-order for height/submax
	var order []*TreeNode
	stack := []*TreeNode{root}
	depth[root.Val] = 0
	for len(stack) > 0 {
		u := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		order = append(order, u)
		if u.Left != nil {
			depth[u.Left.Val] = depth[u.Val] + 1
			stack = append(stack, u.Left)
		}
		if u.Right != nil {
			depth[u.Right.Val] = depth[u.Val] + 1
			stack = append(stack, u.Right)
		}
	}

	for k := len(order) - 1; k >= 0; k-- {
		u := order[k]
		h := 0
		if u.Left != nil {
			h = max(h, 1+height[u.Left.Val])
		}
		if u.Right != nil {
			h = max(h, 1+height[u.Right.Val])
		}
		height[u.Val] = h
		sm := depth[u.Val] + h
		if u.Left != nil {
			sm = max(sm, submax[u.Left.Val])
		}
		if u.Right != nil {
			sm = max(sm, submax[u.Right.Val])
		}
		submax[u.Val] = sm
	}

	type frame struct {
		node *TreeNode
		mx   int
	}
	ans := make(map[int]int)
	st := []frame{{root, -1}}
	for len(st) > 0 {
		f := st[len(st)-1]
		st = st[:len(st)-1]
		u, mx := f.node, f.mx
		ans[u.Val] = mx
		left, right := u.Left, u.Right
		dv := depth[u.Val]
		if left != nil {
			hWithoutLeft := 0
			if right != nil {
				hWithoutLeft = 1 + height[right.Val]
			}
			newMx := mx
			if dv+hWithoutLeft > newMx {
				newMx = dv + hWithoutLeft
			}
			if right != nil && submax[right.Val] > newMx {
				newMx = submax[right.Val]
			}
			st = append(st, frame{left, newMx})
		}
		if right != nil {
			hWithoutRight := 0
			if left != nil {
				hWithoutRight = 1 + height[left.Val]
			}
			newMx := mx
			if dv+hWithoutRight > newMx {
				newMx = dv + hWithoutRight
			}
			if left != nil && submax[left.Val] > newMx {
				newMx = submax[left.Val]
			}
			st = append(st, frame{right, newMx})
		}
	}

	res := make([]int, len(queries))
	for i, q := range queries {
		res[i] = ans[q]
	}
	return res
}
