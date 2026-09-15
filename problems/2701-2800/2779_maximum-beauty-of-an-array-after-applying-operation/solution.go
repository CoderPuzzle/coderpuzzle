import "sort"

func maximumBeauty(nums []int, k int) int {
	// An element can only ever take a value inside [v-k, v+k] — operating
	// moves it anywhere in that range and leaving it alone keeps it there.
	// Two elements can therefore be driven to one common value exactly
	// when their ranges intersect, i.e. their values differ by at most 2k.
	arr := make([]int, len(nums))
	copy(arr, nums)
	sort.Ints(arr)
	best := 1
	left := 0
	for right := 0; right < len(arr); right++ {
		// Shrink while the window's extremes do not share a common value;
		// once the extremes fit, every pair inside the window fits too,
		// because sorted order lets the extremes bound every difference.
		for arr[right]-arr[left] > 2*k {
			left++
		}
		// The whole window can be made equal, so its length is achievable;
		// windows only get longer by growing, never by shrinking.
		if right-left+1 > best {
			best = right - left + 1
		}
	}
	return best
}
