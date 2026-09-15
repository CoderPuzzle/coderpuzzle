import "sort"

func specialArray(nums []int) int {
	// Sort descending: for candidate x = i, the i-th largest element
	// must still be >= i while the next one drops below it (or i is
	// the last position), which is exactly "i elements are >= i".
	n := len(nums)
	sorted := make([]int, n)
	copy(sorted, nums)
	sort.Sort(sort.Reverse(sort.IntSlice(sorted)))
	for i := 1; i <= n; i++ {
		if sorted[i-1] >= i && (i == n || sorted[i] < i) {
			return i
		}
	}
	// Every element is non-negative, so x = 0 would need an empty
	// array; nothing else worked, so the array is not special.
	return -1
}
