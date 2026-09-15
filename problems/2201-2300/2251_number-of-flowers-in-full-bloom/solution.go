import "sort"

func fullBloomFlowers(flowers [][]int, people []int) []int {
	n := len(flowers)
	starts := make([]int, n)
	ends := make([]int, n)
	for i, f := range flowers {
		starts[i] = f[0]
		ends[i] = f[1]
	}
	// The two sides can be sorted separately: a query never needs to know
	// which start belongs to which end, only the two one-sided counts.
	sort.Ints(starts)
	sort.Ints(ends)

	res := make([]int, len(people))
	for i, t := range people {
		// Blooming at t: start <= t and end >= t.
		// first index with starts[idx] > t — counts starts <= t, so a
		// flower starting exactly at t is blooming.
		a := sort.Search(n, func(j int) bool { return starts[j] > t })
		// first index with ends[idx] >= t — counts ends < t, so a flower
		// ending exactly at t is still counted.
		b := sort.SearchInts(ends, t)
		res[i] = a - b
	}
	return res
}
