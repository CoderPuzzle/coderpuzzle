func findAnswer(parent []int, s string) []bool {
	n := len(parent)
	children := make([][]int, n)
	for i := range children {
		children[i] = []int{}
	}
	for i := 1; i < n; i++ {
		children[parent[i]] = append(children[parent[i]], i)
	}

	// Postorder tour of the whole tree: dfs(x) appends every subtree
	// string of x before s[x], so the subtree of node i is exactly the
	// tour segment of length size[i] ending at i's own position. The
	// stack version below visits children in decreasing order, whose
	// reverse is the required postorder (children increasing, node last).
	pre := make([]int, 0, n)
	stack := []int{0}
	for len(stack) > 0 {
		v := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		pre = append(pre, v)
		stack = append(stack, children[v]...)
	}
	post := make([]int, n)
	for i := range post {
		post[i] = pre[n-1-i]
	}

	tour := make([]byte, n)
	pos := make([]int, n)
	size := make([]int, n)
	for i := range size {
		size[i] = 1
	}
	for idx, v := range post {
		tour[idx] = s[v]
		pos[v] = idx
	}
	for _, v := range post {
		if parent[v] >= 0 {
			size[parent[v]] += size[v]
		}
	}

	// Manacher's algorithm on the tour: p[i] is the palindrome radius at
	// center i of the '#' interleaving. A substring [l, r] is a palindrome
	// iff the radius at its transformed center l + r + 1 covers its full
	// length, so each node costs one comparison.
	m := 2*n + 1
	t := make([]byte, m)
	for i := range t {
		t[i] = '#'
	}
	for i := 0; i < n; i++ {
		t[2*i+1] = tour[i]
	}
	p := make([]int, m)
	center, right := 0, 0
	for i := 0; i < m; i++ {
		if i < right {
			p[i] = min(right-i, p[2*center-i])
		}
		for i-p[i]-1 >= 0 && i+p[i]+1 < m && t[i-p[i]-1] == t[i+p[i]+1] {
			p[i]++
		}
		if i+p[i] > right {
			center = i
			right = i + p[i]
		}
	}

	answer := make([]bool, n)
	for i := 0; i < n; i++ {
		answer[i] = p[2*pos[i]-size[i]+2] >= size[i]
	}
	return answer
}
