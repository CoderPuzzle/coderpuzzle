import "sort"

func findSpecialInteger(arr []int) int {
	// A value covering more than a quarter of the array must span at least
	// one of the positions n/4, n/2, 3n/4 (a run longer than n/4 cannot
	// fit between two consecutive quarter marks). Each candidate is
	// verified by binary-searching its first and last occurrence.
	n := len(arr)
	for _, probe := range [3]int{n / 4, n / 2, 3 * n / 4} {
		candidate := arr[probe]
		lo := sort.SearchInts(arr, candidate)
		hi := sort.Search(len(arr), func(i int) bool { return arr[i] > candidate })
		if hi-lo > n/4 {
			return candidate
		}
	}
	return arr[n-1]
}
