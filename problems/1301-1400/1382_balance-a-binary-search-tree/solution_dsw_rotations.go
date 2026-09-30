func balanceBST(root *TreeNode) *TreeNode {
	// phase 1: fold the tree into a descending "vine" — a left-only
	// chain in decreasing value order — via left rotations. A dummy
	// head lets the vine's own root be rotated without a special case.
	dummy := &TreeNode{Val: 0}
	dummy.Left = root
	tail := dummy
	rest := dummy.Left
	for rest != nil {
		if rest.Right != nil {
			child := rest.Right
			rest.Right = child.Left
			child.Left = rest
			rest = child
			tail.Left = child
		} else {
			tail = rest
			rest = rest.Left
		}
	}

	size := 0
	for node := dummy.Left; node != nil; node = node.Left {
		size++
	}

	// phase 2: compress the vine into a complete tree with right
	// rotations, working from the leaves inward. The first round trims
	// the vine down to the largest 2**k - 1 size (its "extra" leaves);
	// every following round halves what remains, exactly like the book
	// DSW algorithm mirrored end for end.
	compress := func(count int) {
		scanner := dummy
		for i := 0; i < count; i++ {
			child := scanner.Left
			grandchild := child.Left
			scanner.Left = grandchild
			child.Left = grandchild.Right
			grandchild.Right = child
			scanner = grandchild
		}
	}

	power := 1
	for power*2 <= size+1 {
		power *= 2
	}
	compress(size + 1 - power)
	size = power - 1
	for size > 1 {
		compress(size / 2)
		size /= 2
	}

	return dummy.Left
}
