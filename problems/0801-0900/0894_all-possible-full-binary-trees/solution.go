func allPossibleFBT(n int) []*TreeNode {
	// A full tree's node count is odd: the root alone is 1, and every
	// internal node adds a pair. An even n therefore admits no tree.
	if n%2 == 0 {
		return []*TreeNode{}
	}
	// One memo slot per node count, shared across the recursion: every
	// subtree size recurs many times, so each list is built once.
	memo := make([][]*TreeNode, n+1)
	var build func(count int) []*TreeNode
	build = func(count int) []*TreeNode {
		if count == 1 {
			return []*TreeNode{{Val: 0}}
		}
		if memo[count] != nil {
			return memo[count]
		}
		// The root is fixed; a tree of count nodes is a choice of left
		// shape times right shape over every odd split of count-1 — left
		// sizes ascending, left shapes outermost, exactly the order the
		// statement pins. Subtrees are shared, not copied: emitting a tree
		// links two memoized shapes. The recursion steps count down by 2,
		// so it nests at most n/2 + 1 frames — 11 at the constraint's
		// n = 20.
		trees := []*TreeNode{}
		for leftCount := 1; leftCount < count-1; leftCount += 2 {
			lefts := build(leftCount)
			rights := build(count - 1 - leftCount)
			for _, left := range lefts {
				for _, right := range rights {
					trees = append(trees, &TreeNode{Val: 0, Left: left, Right: right})
				}
			}
		}
		memo[count] = trees
		return trees
	}
	return build(n)
}
