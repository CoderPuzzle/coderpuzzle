import "sort"

func componentValue(nums []int, edges [][]int) int {
	n := len(nums)
	adjacency := make([][]int, n)
	for _, edge := range edges {
		a, b := edge[0], edge[1]
		adjacency[a] = append(adjacency[a], b)
		adjacency[b] = append(adjacency[b], a)
	}

	// iterative DFS from node 0: parents + a visitation order whose
	// reverse is a valid post-order
	parent := make([]int, n)
	parent[0] = -1
	order := make([]int, 0, n)
	stack := make([]int, 0, n)
	stack = append(stack, 0)
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		order = append(order, node)
		for _, nxt := range adjacency[node] {
			if nxt != parent[node] {
				parent[nxt] = node
				stack = append(stack, nxt)
			}
		}
	}

	// subtree sums: everything a node keeps after its own greedy cuts
	sums := make([]int, n)
	copy(sums, nums)
	largest := nums[0]
	for _, v := range nums {
		if v > largest {
			largest = v
		}
	}
	for i := len(order) - 1; i >= 0; i-- {
		node := order[i]
		if parent[node] >= 0 {
			sums[parent[node]] += sums[node]
		}
	}

	total := sums[0]
	counts := []int{}
	for divisor := 1; divisor*divisor <= total; divisor++ {
		if total%divisor == 0 {
			counts = append(counts, divisor)
			if divisor != total/divisor {
				counts = append(counts, total/divisor)
			}
		}
	}
	sort.Sort(sort.Reverse(sort.IntSlice(counts)))
	for _, k := range counts {
		value := total / k
		if value < largest {
			continue
		}
		components := 0
		for _, s := range sums {
			if s%value == 0 {
				components++
			}
		}
		if components == k {
			return k - 1
		}
	}
	return 0
}
