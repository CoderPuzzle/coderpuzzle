import "sort"

func oddEvenJumps(arr []int) int {
	// The jump out of every index is forced: an odd jump lands on the
	// smallest value >= arr[i] to the right, an even jump on the largest
	// value <= arr[i], and ties go to the smallest index. Build both
	// jump tables with one sort and one stack each: walk the indices
	// ordered by (value, index) — by (negated value, index) for the
	// even table — and each newcomer resolves every still-open index
	// standing to its left, because the first walker with a larger
	// original index is exactly the forced target. Then sweep from the
	// right: odd_ok[i] holds when the odd target's even_ok holds,
	// even_ok[i] when the even target's odd_ok holds, the last index is
	// good under both with zero jumps, and the answer counts the
	// odd_ok starts — every good start opens with an odd jump.
	n := len(arr)
	higher := jumpTable(arr, false)
	lower := jumpTable(arr, true)
	oddOk := make([]bool, n)
	evenOk := make([]bool, n)
	oddOk[n-1] = true
	evenOk[n-1] = true
	count := 1
	for i := n - 2; i >= 0; i-- {
		if j := higher[i]; j != -1 && evenOk[j] {
			oddOk[i] = true
		}
		if j := lower[i]; j != -1 && oddOk[j] {
			evenOk[i] = true
		}
		if oddOk[i] {
			count++
		}
	}
	return count
}

// Stack of indices still waiting for their forced target; the first
// walker standing further right resolves each of them.
func jumpTable(arr []int, descending bool) []int {
	n := len(arr)
	order := make([]int, n)
	for i := range order {
		order[i] = i
	}
	sort.Slice(order, func(a, b int) bool {
		if arr[order[a]] != arr[order[b]] {
			if descending {
				return arr[order[b]] < arr[order[a]]
			}
			return arr[order[a]] < arr[order[b]]
		}
		return order[a] < order[b]
	})
	table := make([]int, n)
	for i := range table {
		table[i] = -1
	}
	stack := make([]int, 0, n)
	for _, j := range order {
		for len(stack) > 0 && stack[len(stack)-1] < j {
			table[stack[len(stack)-1]] = j
			stack = stack[:len(stack)-1]
		}
		stack = append(stack, j)
	}
	return table
}
