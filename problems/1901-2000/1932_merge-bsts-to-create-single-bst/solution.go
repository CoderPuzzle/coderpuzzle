func canMerge(trees []*TreeNode) *TreeNode {
	// The final root is the unique root value that never appears as a leaf
	// of another tree; duplicate leaf values make merging impossible
	// outright, since a valid BST holds each value exactly once.
	leafSeen := make(map[int]bool)
	for _, root := range trees {
		for _, child := range []*TreeNode{root.Left, root.Right} {
			if child != nil {
				if leafSeen[child.Val] {
					return nil
				}
				leafSeen[child.Val] = true
			}
		}
	}
	var root *TreeNode
	candidates := 0
	for _, r := range trees {
		if !leafSeen[r.Val] {
			root = r
			candidates++
		}
	}
	if candidates != 1 {
		return nil
	}

	// by_val maps every live node value to its node; splicing a tree in
	// registers the incoming nodes so later trees can chain onto them.
	byVal := make(map[int]*TreeNode)
	stack := []*TreeNode{root}
	for len(stack) > 0 {
		nd := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		byVal[nd.Val] = nd
		if nd.Left != nil {
			stack = append(stack, nd.Left)
		}
		if nd.Right != nil {
			stack = append(stack, nd.Right)
		}
	}

	var pending []*TreeNode
	for _, t := range trees {
		if t != root {
			pending = append(pending, t)
		}
	}
	for len(pending) > 0 {
		var rest []*TreeNode
		progressed := false
		for _, tree := range pending {
			host, ok := byVal[tree.Val]
			// A host must be a true leaf other than the final root.
			if ok && host != root && host.Left == nil && host.Right == nil {
				host.Left, host.Right = tree.Left, tree.Right
				sub := []*TreeNode{tree}
				for len(sub) > 0 {
					nd := sub[len(sub)-1]
					sub = sub[:len(sub)-1]
					byVal[nd.Val] = nd
					if nd.Left != nil {
						sub = append(sub, nd.Left)
					}
					if nd.Right != nil {
						sub = append(sub, nd.Right)
					}
				}
				progressed = true
			} else {
				rest = append(rest, tree)
			}
		}
		if !progressed {
			return nil
		}
		pending = rest
	}

	// Validate: strict in-order increase proves BST ordering and that every
	// value is distinct; the distinct-value count proves all n - 1 merges
	// actually landed inside one connected tree. Iterative walk, safe at
	// n = 5*10^4.
	prev := -1
	seen := make(map[int]bool)
	var stack2 []*TreeNode
	cur := root
	for len(stack2) > 0 || cur != nil {
		for cur != nil {
			stack2 = append(stack2, cur)
			cur = cur.Left
		}
		cur = stack2[len(stack2)-1]
		stack2 = stack2[:len(stack2)-1]
		if prev >= 0 && cur.Val <= prev {
			return nil
		}
		prev = cur.Val
		seen[cur.Val] = true
		cur = cur.Right
	}
	if len(seen) != len(byVal) {
		return nil
	}
	return root
}
