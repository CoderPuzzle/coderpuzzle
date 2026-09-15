import "sort"

// Fenwick over compressed ranks instead of merge-sort counting: walk
// right-to-left, so by the time the walk reaches an entry the tree already
// holds exactly the entries to that entry's right.
func reversePairs(nums []int) int {
	// Widen to int64: values reach both int32 extremes and 2 * value would
	// overflow.
	sorted := make([]int64, len(nums))
	for i, v := range nums {
		sorted[i] = int64(v)
	}
	sort.Slice(sorted, func(a, b int) bool { return sorted[a] < sorted[b] })
	// Values span the full int32 range, so the ranks come from the sorted
	// distinct values, and their doubled selves ride beside them — x
	// qualifies against v exactly when 2 * v < x.
	var vals, doubled []int64
	for i, v := range sorted {
		if i == 0 || v != sorted[i-1] {
			vals = append(vals, v)
			doubled = append(doubled, 2*v)
		}
	}
	size := len(vals)
	bit := make([]int, size+1)

	update := func(i, delta int) {
		for i <= size {
			bit[i] += delta
			i += i & (-i)
		}
	}
	query := func(i int) int {
		total := 0
		for i > 0 {
			total += bit[i]
			i -= i & (-i)
		}
		return total
	}
	lowerBound := func(a []int64, target int64) int {
		lo, hi := 0, len(a)
		for lo < hi {
			mid := (lo + hi) / 2
			if a[mid] < target {
				lo = mid + 1
			} else {
				hi = mid
			}
		}
		return lo
	}

	// The tally is kept int64 alongside the widened comparisons.
	var count int64
	for k := len(nums) - 1; k >= 0; k-- {
		x := int64(nums[k])
		// Every held value with 2 * v < x ranks below the cut, so the
		// prefix query totals exactly the later entries x more than
		// doubles — and querying before inserting keeps x from counting
		// itself.
		count += int64(query(lowerBound(doubled, x)))
		rank := lowerBound(vals, x) + 1
		update(rank, 1)
	}
	return int(count)
}
