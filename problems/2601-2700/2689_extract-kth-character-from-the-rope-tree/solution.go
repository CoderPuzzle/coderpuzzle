func getKthCharacter(root []string, k int) string {
	// Decode the level order: an entry of digits is an internal node, an
	// entry of letters is a leaf, and "" marks an absent child. Only
	// internal nodes occupy child slots, so only they join the queue.
	n := len(root)
	internal := make([]bool, n)
	word := make([]string, n)
	left := make([]int, n)
	right := make([]int, n)
	for i := range root {
		left[i], right[i] = -1, -1
		c := byte(' ')
		if root[i] != "" {
			c = root[i][0]
		}
		internal[i] = c >= '0' && c <= '9'
		if !internal[i] {
			word[i] = root[i]
		}
	}
	queue := make([]int, 0, n)
	queue = append(queue, 0)
	for i, head := 1, 0; head < len(queue); head++ {
		nd := queue[head]
		for slot := 0; slot < 2; slot++ {
			if i >= n {
				break
			}
			child := i
			i++
			if root[child] == "" {
				continue
			}
			if slot == 0 {
				left[nd] = child
			} else {
				right[nd] = child
			}
			if internal[child] {
				queue = append(queue, child)
			}
		}
	}
	// total[i] = length of S[i], computed bottom-up with an explicit
	// stack: a leaf contributes word length, an internal node the sum of
	// its children's totals.
	total := make([]int, n)
	type frame struct {
		nd    int
		ready bool
	}
	stack := []frame{{nd: 0}}
	for len(stack) > 0 {
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if !internal[top.nd] {
			total[top.nd] = len(word[top.nd])
		} else if top.ready {
			if left[top.nd] >= 0 {
				total[top.nd] += total[left[top.nd]]
			}
			if right[top.nd] >= 0 {
				total[top.nd] += total[right[top.nd]]
			}
		} else {
			stack = append(stack, frame{nd: top.nd, ready: true})
			if right[top.nd] >= 0 {
				stack = append(stack, frame{nd: right[top.nd]})
			}
			if left[top.nd] >= 0 {
				stack = append(stack, frame{nd: left[top.nd]})
			}
		}
	}
	// Descend without ever building a string: the left subtree owns the
	// first total[left] characters, so k either falls inside it or shifts
	// past it into the right subtree.
	nd := 0
	for internal[nd] {
		leftLen := 0
		if left[nd] >= 0 {
			leftLen = total[left[nd]]
		}
		if k <= leftLen {
			nd = left[nd]
		} else {
			k -= leftLen
			nd = right[nd]
		}
	}
	return string(word[nd][k-1])
}
