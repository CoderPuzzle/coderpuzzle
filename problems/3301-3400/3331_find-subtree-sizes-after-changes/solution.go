func findSubtreeSizes(parent []int, s string) []int {
	n := len(parent)
	children := make([][]int, n)
	for i := range children {
		children[i] = []int{}
	}
	for i := 1; i < n; i++ {
		children[parent[i]] = append(children[parent[i]], i)
	}

	// Iterative DFS from the root. last[c] is the closest ancestor of the
	// current node holding character c; entering v saves it on the stack
	// (paired with v) and the exit visit restores it, so last[] always
	// describes the current root-to-v path. The changes are simultaneous
	// and every rewiring points at an original ancestor, so resolving
	// each node against the original tree is exact.
	last := make([]int, 26)
	for i := range last {
		last[i] = -1
	}
	newparent := make([]int, n)
	for i := range newparent {
		newparent[i] = -1
	}
	pre := make([]int, 0, n)
	const enter = -2
	type frame struct {
		v     int
		saved int
	}
	stack := []frame{{0, enter}}
	for len(stack) > 0 {
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		v, saved := top.v, top.saved
		c := int(s[v] - 'a')
		if saved == enter {
			pre = append(pre, v)
			if last[c] != -1 {
				newparent[v] = last[c]
			} else {
				newparent[v] = parent[v]
			}
			stack = append(stack, frame{v, last[c]})
			last[c] = v
			for _, ch := range children[v] {
				stack = append(stack, frame{ch, enter})
			}
		} else {
			last[c] = saved
		}
	}

	// Each new parent precedes v in preorder, so consuming preorder in
	// reverse folds subtree sizes up the final tree in one pass.
	size := make([]int, n)
	for i := range size {
		size[i] = 1
	}
	for i := n - 1; i >= 1; i-- {
		v := pre[i]
		if p := newparent[v]; p >= 0 {
			size[p] += size[v]
		}
	}
	return size
}
