func buildTree(inorder []int, postorder []int) *TreeNode {
	// Value -> inorder index: makes each split lookup O(1) instead of a
	// linear scan. Values are unique, so a hit is exactly one split point.
	index := make(map[int]int, len(inorder))
	for i, value := range inorder {
		index[value] = i
	}
	// Postorder ends with the root, and the reversed array lists root, right
	// subtree, left subtree -- so a cursor walking postorder backwards hands
	// out subtree roots in exactly the order the frames below claim them.
	position := len(postorder) - 1
	// A dummy parent lets the real root pass through the same attach logic
	// as every other node; the answer is dummy.Left.
	dummy := &TreeNode{Val: 0}
	// Frames are (parent, attachLeft, low, high) over inorder ranges.
	// Popping a frame claims at most one root value from the cursor, so an
	// explicit stack -- not recursion -- drives the build: the constraint
	// ceiling allows a 3000-node chain, and recursion that deep is not safe
	// in every judge language.
	type frame struct {
		parent     *TreeNode
		attachLeft bool
		low, high  int
	}
	stack := []frame{{parent: dummy, attachLeft: true, low: 0, high: len(inorder)}}
	for len(stack) > 0 {
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if top.low >= top.high {
			// Empty inorder range <=> missing subtree.
			continue
		}
		value := postorder[position]
		position--
		node := &TreeNode{Val: value}
		if top.attachLeft {
			top.parent.Left = node
		} else {
			top.parent.Right = node
		}
		mid := index[value]
		// Inorder visits left, root, right: [low, mid) is the left subtree
		// and [mid+1, high) the right. Left is pushed first so the right
		// frame pops -- and its root is consumed -- first.
		stack = append(stack, frame{parent: node, attachLeft: true, low: top.low, high: mid})
		stack = append(stack, frame{parent: node, attachLeft: false, low: mid + 1, high: top.high})
	}
	return dummy.Left
}
