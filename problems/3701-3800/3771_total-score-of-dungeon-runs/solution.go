import "sort"

// pref[i] = total damage of rooms 1..i (pref[0] = 0). Starting at room a+1,
// room b (b >= a+1) pays a point iff hp - (pref[b] - pref[a]) >=
// requirement[b], i.e. pref[a] >= requirement[b] - hp + pref[b]. Over all
// n(n+1)/2 subarrays this is a dominance count, done per b with a Fenwick
// tree over compressed prefix sums holding pref[0..b-1]; failing pairs
// (pref[a] < threshold) are subtracted from the total. Prefix sums reach 1e9
// and the answer n(n+1)/2 ~ 5e9, so int64 is used throughout.
func totalScore(hp int, damage []int, requirement []int) int64 {
	n := len(damage)
	pref := make([]int64, n+1)
	for i := 0; i < n; i++ {
		pref[i+1] = pref[i] + int64(damage[i])
	}
	values := make([]int64, n+1)
	copy(values, pref)
	sort.Slice(values, func(a, b int) bool { return values[a] < values[b] })
	m := 1
	for i := 1; i <= n; i++ {
		if values[i] != values[m-1] {
			values[m] = values[i]
			m++
		}
	}
	values = values[:m]
	bit := make([]int, m+1)
	add := func(pos int) {
		for i := pos + 1; i <= m; i += i & -i {
			bit[i]++
		}
	}
	prefix := func(pos int) int64 {
		var total int64
		for i := pos; i > 0; i -= i & -i {
			total += int64(bit[i])
		}
		return total
	}
	lower := func(x int64) int {
		return sort.Search(len(values), func(i int) bool { return values[i] >= x })
	}
	add(lower(pref[0]))
	var failing int64
	for b := 1; b <= n; b++ {
		threshold := int64(requirement[b-1]) - int64(hp) + pref[b]
		// Number of inserted pref[a] with pref[a] < threshold.
		failing += prefix(lower(threshold))
		add(lower(pref[b]))
	}
	return int64(n)*int64(n+1)/2 - failing
}
