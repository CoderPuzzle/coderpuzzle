func maxGeneticDifference(parents []int, queries [][]int) []int {
	const BITS = 18
	n := len(parents)
	children := make([][]int, n)
	root := -1
	for i, p := range parents {
		if p == -1 {
			root = i
		} else {
			children[p] = append(children[p], i)
		}
	}

	byNode := make([][][2]int, n) // (val, query index)
	for idx, q := range queries {
		byNode[q[0]] = append(byNode[q[0]], [2]int{q[1], idx})
	}

	ans := make([]int, len(queries))

	// trie stored as flat slices: children[bit] indices and subtree counts
	type trieNode struct{ ch [2]int }
	nxt := []trieNode{{}}
	count := []int{0}

	insert := func(x, delta int) {
		node := 0
		count[node] += delta
		for b := BITS - 1; b >= 0; b-- {
			bit := (x >> b) & 1
			if nxt[node].ch[bit] == 0 {
				nxt[node].ch[bit] = len(nxt)
				nxt = append(nxt, trieNode{})
				count = append(count, 0)
			}
			node = nxt[node].ch[bit]
			count[node] += delta
		}
	}

	queryMax := func(x int) int {
		node := 0
		res := 0
		for b := BITS - 1; b >= 0; b-- {
			bit := (x >> b) & 1
			want := 1 - bit
			cand := nxt[node].ch[want]
			if cand != 0 && count[cand] > 0 {
				res |= 1 << b
				node = cand
			} else {
				node = nxt[node].ch[bit]
			}
		}
		return res
	}

	type frame struct {
		u       int
		exiting bool
	}
	stack := []frame{{u: root}}
	for len(stack) > 0 {
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if top.exiting {
			insert(top.u, -1)
			continue
		}
		stack = append(stack, frame{u: top.u, exiting: true})
		insert(top.u, 1)
		for _, q := range byNode[top.u] {
			ans[q[1]] = queryMax(q[0])
		}
		for _, v := range children[top.u] {
			stack = append(stack, frame{u: v})
		}
	}

	return ans
}
