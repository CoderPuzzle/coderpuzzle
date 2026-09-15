// fenwickTree is a 1-indexed Fenwick tree over the n original positions of
// s, tracking which positions of one particular digit are still unconsumed.
type fenwickTree struct {
	size int
	tree []int
}

func newFenwickTree(size int) *fenwickTree {
	return &fenwickTree{size: size, tree: make([]int, size+1)}
}

func (f *fenwickTree) add(index int, delta int) {
	index++
	for index <= f.size {
		f.tree[index] += delta
		index += index & (-index)
	}
}

func (f *fenwickTree) prefixCount(index int) int {
	total := 0
	for index > 0 {
		total += f.tree[index]
		index -= index & (-index)
	}
	return total
}

func isTransformable(s string, t string) bool {
	n := len(s)
	if len(t) != n {
		return false
	}

	// queue[d]: original positions in s carrying digit d, oldest first.
	var queue [10][]int
	for index := 0; index < n; index++ {
		d := s[index] - '0'
		queue[d] = append(queue[d], index)
	}
	var head [10]int

	// fenwick[d] marks which occurrences of digit d are still unconsumed,
	// so a prefix query answers "how many remaining digit-d positions
	// sit left of index x".
	var fenwick [10]*fenwickTree
	for d := 0; d < 10; d++ {
		fenwick[d] = newFenwickTree(n)
	}
	for index := 0; index < n; index++ {
		fenwick[s[index]-'0'].add(index, 1)
	}

	for i := 0; i < n; i++ {
		digit := int(t[i] - '0')
		if head[digit] >= len(queue[digit]) {
			return false
		}
		pos := queue[digit][head[digit]]
		head[digit]++
		// any remaining strictly-smaller digit still left of pos
		// permanently blocks it: sorting only lets pos move left past
		// digits strictly greater than it, never past a smaller one.
		blocked := 0
		for smaller := 0; smaller < digit; smaller++ {
			blocked += fenwick[smaller].prefixCount(pos)
		}
		if blocked != 0 {
			return false
		}
		fenwick[digit].add(pos, -1)
	}

	return true
}
