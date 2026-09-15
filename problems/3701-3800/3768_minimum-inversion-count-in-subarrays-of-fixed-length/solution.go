import "sort"

func minInversionCount(nums []int, k int) int64 {
	// Two neighboring windows share k - 1 elements, so the inversion
	// count updates in O(log n) per slide instead of a recount: the
	// element leaving at the front loses its pairs with smaller
	// survivors, the element entering at the back gains pairs with
	// larger survivors. Both are dynamic rank queries over the window's
	// values, so keep the window's elements counted in a Fenwick tree
	// indexed by compressed value.
	//
	// Order matters on every slide: drop the front element from the tree
	// and subtract how many smaller elements it was paired with BEFORE
	// the new element joins, then insert the newcomer and add how many
	// strictly larger elements remain — querying against the wrong
	// intermediate window double-counts when the two values are equal.
	// Strict comparisons throughout: equal neighbors are not inversions.
	vals := make([]int, len(nums))
	copy(vals, nums)
	sort.Ints(vals)
	m := 0
	for i, v := range vals {
		if i == 0 || v != vals[i-1] {
			vals[m] = v
			m++
		}
	}
	rank := make(map[int]int, m)
	for i := 0; i < m; i++ {
		rank[vals[i]] = i + 1
	}
	tree := make([]int64, m+1)
	query := func(index int) int64 {
		var total int64
		for ; index > 0; index &= index - 1 {
			total += tree[index]
		}
		return total
	}
	update := func(index int, delta int64) {
		for ; index <= m; index += index & -index {
			tree[index] += delta
		}
	}

	// Build the first window; size - prefix(rank) counts elements already
	// inside that are strictly greater than the one being added.
	var inversions int64
	for i := 0; i < k; i++ {
		rx := rank[nums[i]]
		inversions += int64(i) - query(rx)
		update(rx, 1)
	}
	best := inversions
	for right := k; right < len(nums); right++ {
		ry := rank[nums[right-k]]
		rx := rank[nums[right]]
		inversions -= query(ry - 1)
		update(ry, -1)
		inversions += int64(k-1) - query(rx)
		update(rx, 1)
		if inversions < best {
			best = inversions
		}
	}
	return best
}
