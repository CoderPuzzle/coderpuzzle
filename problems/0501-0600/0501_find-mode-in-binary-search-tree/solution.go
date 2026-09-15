// The streak state both passes share: the last value emitted and how many
// times it has come up in a row.
type run struct {
	prev    int
	streak  int
	maximum int
	started bool
}

// extend folds one walked value into the running streak and returns the
// streak now standing.
func (r *run) extend(value int) int {
	if r.started && r.prev == value {
		r.streak++
	} else {
		r.streak = 1
	}
	r.prev, r.started = value, true
	if r.streak > r.maximum {
		r.maximum = r.streak
	}
	return r.streak
}

func findMode(root *TreeNode) []int {
	// An inorder walk of a BST emits values in ascending order, so all
	// copies of a value sit next to each other: a mode is just the longest
	// run of equal values in that walk. Two passes find it without ever
	// storing a table of counts. The traversal carries its own stack of
	// nodes so a single 10^4-node chain never strains the goroutine call
	// stack.
	// Pass one measures the longest streak; nothing else is remembered, so
	// no table of counts is ever stored.
	state := &run{}
	inorder(root, func(value int) {
		state.extend(value)
	})

	// Pass two re-walks and emits a value exactly when its streak reaches
	// the maximum — once per mode, in ascending order.
	modes := []int{}
	state.streak, state.started = 0, false
	inorder(root, func(value int) {
		if state.extend(value) == state.maximum {
			modes = append(modes, value)
		}
	})
	return modes
}

// Iterative inorder: descend the left spine stacking every node, then emit
// each popped node and descend its right child.
func inorder(root *TreeNode, visit func(int)) {
	stack := []*TreeNode{}
	current := root
	for current != nil || len(stack) > 0 {
		for current != nil {
			stack = append(stack, current)
			current = current.Left
		}
		current = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		visit(current.Val)
		current = current.Right
	}
}
