import "sort"

func perfectPairs(nums []int) int64 {
	// Signs never matter: with x = |a| <= y = |b| a pair is perfect
	// exactly when y <= 2x, so work in sorted absolute values and count,
	// for each i, the later entries within double of a[i].
	a := make([]int64, len(nums))
	for i, v := range nums {
		if v < 0 {
			v = -v
		}
		a[i] = int64(v)
	}
	sort.Slice(a, func(p, q int) bool { return a[p] < a[q] })
	// The doubled bound 2 * a[i] never shrinks as i moves right, so the
	// frontier j only ever advances; positions strictly between i and j
	// pair with i. Counts reach ~5e9, hence int64.
	var ans int64
	j := 0
	for i := range a {
		for j < len(a) && a[j] <= 2*a[i] {
			j++
		}
		ans += int64(j - i - 1)
	}
	return ans
}
