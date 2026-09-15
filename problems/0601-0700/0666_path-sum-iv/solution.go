func pathSum(nums []int) int {
	// The first two digits of each code are the node's (depth, position);
	// keying a map by them turns the array into the tree itself. A node
	// is a leaf exactly when neither child position exists one level
	// down, and a child at (d, p) hangs from the parent at
	// (d - 1, (p + 1) / 2), so each leaf, walked up to the root,
	// accumulates its whole path.
	tree := make(map[int]int)
	for _, code := range nums {
		tree[code/10] = code % 10
	}
	total := 0
	for _, code := range nums {
		d, p := code/100, code/10%10
		_, hasLeft := tree[(d+1)*10+2*p-1]
		_, hasRight := tree[(d+1)*10+2*p]
		if hasLeft || hasRight {
			continue
		}
		for d > 0 {
			total += tree[d*10+p]
			p = (p + 1) / 2
			d--
		}
	}
	return total
}
