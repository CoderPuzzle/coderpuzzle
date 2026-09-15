import "sort"

func maxProfit(prices []int, profits []int) int {
	// Fix the middle item j. Two Fenwick (binary indexed) trees over the
	// compressed price ranks answer, for every j, the maximum profit among
	// earlier items priced strictly below prices[j] and among later items
	// priced strictly above prices[j]; the right pass runs the same prefix
	// queries over reversed ranks. Every profit is >= 1, so a query result
	// of 0 means "no such item exists". With n up to 5 * 10^4 these two
	// log-passes are what keep the scan linear-ish.
	n := len(prices)
	ranks := append([]int(nil), prices...)
	sort.Ints(ranks)
	m := 0
	for _, p := range ranks {
		if m == 0 || ranks[m-1] != p {
			ranks[m] = p
			m++
		}
	}
	ranks = ranks[:m]
	rankOf := func(p int) int {
		lo, hi := 0, m
		for lo < hi {
			mid := (lo + hi) / 2
			if ranks[mid] < p {
				lo = mid + 1
			} else {
				hi = mid
			}
		}
		return lo + 1
	}
	query := func(tree []int, i int) int {
		best := 0
		for ; i > 0; i -= i & -i {
			if tree[i] > best {
				best = tree[i]
			}
		}
		return best
	}
	update := func(tree []int, i int, gain int) {
		for ; i <= m; i += i & -i {
			if gain > tree[i] {
				tree[i] = gain
			}
		}
	}
	tree := make([]int, m+1)
	left := make([]int, n)
	for j := 0; j < n; j++ {
		r := rankOf(prices[j])
		left[j] = query(tree, r-1)
		update(tree, r, profits[j])
	}
	tree = make([]int, m+1)
	right := make([]int, n)
	for j := n - 1; j >= 0; j-- {
		r := m + 1 - rankOf(prices[j])
		right[j] = query(tree, r-1)
		update(tree, r, profits[j])
	}
	best := -1
	for j := 0; j < n; j++ {
		if left[j] > 0 && right[j] > 0 {
			if total := left[j] + profits[j] + right[j]; total > best {
				best = total
			}
		}
	}
	return best
}
