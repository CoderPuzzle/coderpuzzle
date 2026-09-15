import "sort"

// Sliding window: once arr[lo] + arr[hi] <= limit, every index between lo
// and hi pairs with lo as well, worth hi - lo pairs. Sums touch +-2e9 and
// answers reach C(n,2) ~= 5e9, both beyond 32-bit, so everything widens to
// int64 before the arithmetic.
func countAtMost(arr []int, limit int64) int64 {
	var total int64
	lo, hi := 0, len(arr)-1
	for lo < hi {
		if int64(arr[lo])+int64(arr[hi]) <= limit {
			total += int64(hi - lo)
			lo++
		} else {
			hi--
		}
	}
	return total
}

func countFairPairs(nums []int, lower int, upper int) int64 {
	arr := append([]int(nil), nums...)
	sort.Ints(arr)
	return countAtMost(arr, int64(upper)) - countAtMost(arr, int64(lower)-1)
}
