import "sort"

func countRangeSum(nums []int, lower int, upper int) int {
	n := len(nums)
	// Range sums become pairs: count i < j with
	// prefix[j] - prefix[i] in [lower, upper] (leading 0 included).
	prefix := make([]int64, n+1)
	for i, v := range nums {
		prefix[i+1] = prefix[i] + int64(v)
	}
	// Fenwick tree over the coordinate-compressed prefix values: rank r
	// (1-based) counts how many inserted prefixes carry ranks[r-1].
	ranks := append([]int64(nil), prefix...)
	sort.Slice(ranks, func(a, b int) bool { return ranks[a] < ranks[b] })
	compacted := ranks[:0]
	for i, r := range ranks {
		if i == 0 || r != ranks[i-1] {
			compacted = append(compacted, r)
		}
	}
	ranks = compacted
	m := len(ranks)
	tree := make([]int32, m+1)
	rankOf := func(value int64) int {
		return sort.Search(len(ranks), func(i int) bool { return ranks[i] >= value })
	}
	add := func(value int64) {
		for rank := rankOf(value) + 1; rank <= m; rank += rank & -rank {
			tree[rank]++
		}
	}
	countUpto := func(bound int64) int {
		// How many inserted prefixes are at most bound.
		total := 0
		for rank := sort.Search(len(ranks), func(i int) bool { return ranks[i] > bound }); rank > 0; rank -= rank & -rank {
			total += int(tree[rank])
		}
		return total
	}
	count := int64(0)
	add(prefix[0])
	for j := 1; j <= n; j++ {
		p := prefix[j]
		// An earlier prefix e qualifies when lower <= p - e <= upper,
		// i.e. e lies in [p - upper, p - lower]; both bounds come off
		// the tree as rank-prefix counts.
		count += int64(countUpto(p-int64(lower)) - countUpto(p-int64(upper)-1))
		// Insert only after querying, so a prefix never pairs itself.
		add(p)
	}
	return int(count)
}
