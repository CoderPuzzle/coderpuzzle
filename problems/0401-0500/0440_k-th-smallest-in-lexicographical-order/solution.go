func findKthNumber(n int, k int) int {
	// countSteps gives the size of the subtree rooted at prefix n1: numbers
	// in [1, n] lying in [n1, n2). One level at a time, [n1, n2) covers
	// every number sharing the prefix at that depth, so clamp the right edge
	// past n and scale both bounds by ten for the next level.
	countSteps := func(n1, n2 int64) int64 {
		nn := int64(n)
		var steps int64 = 0
		for n1 <= nn {
			steps += min(nn+1, n2) - n1
			n1 *= 10
			n2 *= 10
		}
		return steps
	}

	// Lexicographic order = preorder walk of the denary tree (children
	// append digits 0-9); kk becomes a zero-based count of nodes to skip.
	var cur int64 = 1
	var kk int64 = int64(k) - 1
	for kk > 0 {
		steps := countSteps(cur, cur+1)
		// Whole subtree between cur and cur+1 fits the budget: skip it and
		// move to the next sibling; otherwise descend past cur itself.
		if steps <= kk {
			cur++
			kk -= steps
		} else {
			cur *= 10
			kk--
		}
	}
	return int(cur)
}
