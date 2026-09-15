func heightOfTree(root *TreeNode) int {
	if root == nil {
		return 0
	}
	// A leaf of the special tree is the one node the display cannot mark:
	// the ring gives every leaf both children, and the previous leaf's
	// right child points back at the leaf itself. A wave only descends
	// from the nodes the test clears, so the ring never joins a wave and
	// every reached node is visited once.
	frontier := []*TreeNode{root}
	height := 0
	for {
		wave := []*TreeNode{}
		for _, node := range frontier {
			if node.Left != nil && node.Left.Right == node {
				continue
			}
			if node.Left != nil {
				wave = append(wave, node.Left)
			}
			if node.Right != nil {
				wave = append(wave, node.Right)
			}
		}
		if len(wave) == 0 {
			return height
		}
		height++
		frontier = wave
	}
}
