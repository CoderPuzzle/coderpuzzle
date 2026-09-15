import "math/bits"

func maxXor(n int, edges [][]int, values []int) int64 {
	graph := make([][]int, n)
	for i := range graph {
		graph[i] = []int{}
	}
	for _, e := range edges {
		graph[e[0]] = append(graph[e[0]], e[1])
		graph[e[1]] = append(graph[e[1]], e[0])
	}

	// iterative DFS for order + parents
	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	visited := make([]bool, n)
	order := make([]int, 0, n)
	visited[0] = true
	stack := []int{0}
	for len(stack) > 0 {
		u := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		order = append(order, u)
		for _, v := range graph[u] {
			if !visited[v] {
				visited[v] = true
				parent[v] = u
				stack = append(stack, v)
			}
		}
	}

	sub := make([]int64, n)
	for i, v := range values {
		sub[i] = int64(v)
	}
	for i := len(order) - 1; i >= 0; i-- {
		u := order[i]
		if p := parent[u]; p >= 0 {
			sub[p] += sub[u]
		}
	}

	maxSum := int64(1)
	for _, x := range sub {
		if x > maxSum {
			maxSum = x
		}
	}
	nbits := bits.Len64(uint64(maxSum))

	// flat trie
	trie := [][2]int{{-1, -1}}
	trieInsert := func(value int64) {
		node := 0
		for b := nbits - 1; b >= 0; b-- {
			bit := int((value >> uint(b)) & 1)
			nxt := trie[node][bit]
			if nxt == -1 {
				nxt = len(trie)
				trie = append(trie, [2]int{-1, -1})
				trie[node][bit] = nxt
			}
			node = nxt
		}
	}
	trieQuery := func(value int64) int64 {
		node := 0
		result := int64(0)
		for b := nbits - 1; b >= 0; b-- {
			bit := int((value >> uint(b)) & 1)
			want := 1 - bit
			if trie[node][want] != -1 {
				result |= 1 << uint(b)
				node = trie[node][want]
			} else {
				node = trie[node][bit]
			}
			if node == -1 {
				return result
			}
		}
		return result
	}

	answer := trieQuery(sub[0])

	ptr := make([]int, n)
	stk := []int{0}
	par := []int{-1}
	for len(stk) > 0 {
		u := stk[len(stk)-1]
		p := par[len(par)-1]
		if ptr[u] < len(graph[u]) {
			v := graph[u][ptr[u]]
			ptr[u]++
			if v != p {
				best := trieQuery(sub[v])
				if best > answer {
					answer = best
				}
				stk = append(stk, v)
				par = append(par, u)
			}
		} else {
			stk = stk[:len(stk)-1]
			par = par[:len(par)-1]
			trieInsert(sub[u])
		}
	}
	return answer
}
