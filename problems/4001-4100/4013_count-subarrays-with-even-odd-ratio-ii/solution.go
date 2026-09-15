import "sort"

func countRatioSubarrays(nums []int, a int, b int) int64 {
	n := len(nums)
	// Transformed prefix sums reach 10^5 * 10^9 = 10^14 in magnitude,
	// and the answer reaches ~5 * 10^9, so both coordinates and the
	// Fenwick cells are 64-bit.
	pref := make([]int64, n+1)
	for i := 0; i < n; i++ {
		if nums[i]%2 == 0 {
			pref[i+1] = pref[i] + int64(b)
		} else {
			pref[i+1] = pref[i] - int64(a)
		}
	}
	// Coordinate-compress the prefix values; duplicates share one slot
	// so that >= comparisons count them all.
	sorted := make([]int64, n+1)
	copy(sorted, pref)
	sort.Slice(sorted, func(i, j int) bool { return sorted[i] < sorted[j] })
	size := 0
	for i, v := range sorted {
		if i == 0 || v != sorted[size-1] {
			sorted[size] = v
			size++
		}
	}
	rank := func(value int64) int {
		return sort.Search(size, func(i int) bool { return sorted[i] >= value }) + 1
	}
	tree := make([]int64, size+1)
	update := func(i int) {
		for ; i <= size; i += i & -i {
			tree[i]++
		}
	}
	query := func(i int) int64 { // how many inserted prefixes have rank <= i
		total := int64(0)
		for ; i > 0; i -= i & -i {
			total += tree[i]
		}
		return total
	}
	answer := int64(0)
	update(rank(pref[0]))
	seen := int64(1)
	for m := 1; m <= n; m++ {
		r := rank(pref[m])
		// Subarray [m-1, k] for every earlier l = k with
		// pref[m] <= pref[l]: everything seen minus what is strictly below.
		answer += seen - query(r-1)
		update(r)
		seen++
	}
	return answer
}
