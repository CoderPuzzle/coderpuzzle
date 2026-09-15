import "sort"

func maximumTripletValue(nums []int) int {
	n := len(nums)
	// Greatest element strictly to the right of each index.
	suffix := make([]int, n)
	suffix[n-1] = nums[n-1]
	for k := n - 2; k >= 0; k-- {
		suffix[k] = max(suffix[k+1], nums[k])
	}
	// Fenwick tree over compressed ranks, storing prefix maxima of the values
	// inserted so far; query(rank - 1) yields the greatest earlier value
	// strictly smaller than nums[j].
	distinct := append([]int(nil), nums...)
	sort.Ints(distinct)
	size := 1
	for i := 1; i < len(distinct); i++ {
		if distinct[i] != distinct[i-1] {
			distinct[size] = distinct[i]
			size++
		}
	}
	distinct = distinct[:size]
	rankOf := func(value int) int {
		return sort.SearchInts(distinct, value) + 1
	}
	tree := make([]int, size+1)
	update := func(i, value int) {
		for ; i <= size; i += i & -i {
			tree[i] = max(tree[i], value)
		}
	}
	query := func(i int) int {
		best := 0
		for ; i > 0; i -= i & -i {
			best = max(best, tree[i])
		}
		return best
	}

	// Every triplet value nums[i] - nums[j] + nums[k] stays within (-10^9,
	// 10^9) because nums[i] < nums[j] < nums[k] <= 10^9.
	best := -(1 << 62)
	update(rankOf(nums[0]), nums[0])
	for j := 1; j < n-1; j++ {
		left := query(rankOf(nums[j]) - 1)
		if left > 0 && nums[j] < suffix[j+1] {
			best = max(best, left-nums[j]+suffix[j+1])
		}
		update(rankOf(nums[j]), nums[j])
	}
	return best
}
