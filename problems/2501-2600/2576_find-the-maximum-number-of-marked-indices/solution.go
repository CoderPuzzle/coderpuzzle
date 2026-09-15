import "sort"

func maxNumOfMarkedIndices(nums []int) int {
	a := append([]int(nil), nums...)
	sort.Ints(a)
	n := len(a)
	i := 0
	// Large partners must come from the upper half: with p pairs the smalls
	// are p elements of the lower part and the larges p of the upper, so j
	// starts at the midpoint.
	for j := (n + 1) / 2; j < n; j++ {
		// Match in sorted order (exchange argument): pairing the smallest
		// remaining small with the smallest qualifying large never costs a
		// match, and i only advances on a successful pair.
		if 2*int64(a[i]) <= int64(a[j]) {
			i++
		}
	}
	// i counts pairs; every pair marks two indices.
	return 2 * i
}
