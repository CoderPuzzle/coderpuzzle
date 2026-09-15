import "sort"

// Exchange arguments: each index needs zeroing at most once ("shift left"
// removes repeats), and among the kept zeroings larger rates belong later -
// taking element e as operation j removes nums1[e] + nums2[e] * j of the
// eventual sum. Sort ascending by rate.
func minimumTime(nums1 []int, nums2 []int, x int) int {
	n := len(nums1)
	order := make([]int, n)
	for index := range order {
		order[index] = index
	}
	sort.Slice(order, func(left, right int) bool {
		return nums2[order[left]] < nums2[order[right]]
	})
	base := 0
	growth := 0
	for index := range nums1 {
		base += nums1[index]
		growth += nums2[index]
	}
	// Best[j] = the most removable using exactly j operations among the
	// elements processed so far; sums reach ~10^9 close to the i32 ceiling,
	// so plain int (64-bit on the judge) carries all intermediates.
	best := make([]int, n+1)
	for position := 1; position <= n; position++ {
		index := order[position-1]
		initial := nums1[index]
		rate := nums2[index]
		for count := position; count >= 1; count-- {
			if candidate := best[count-1] + initial + rate*count; candidate > best[count] {
				best[count] = candidate
			}
		}
	}
	for time := 0; time <= n; time++ {
		if base+growth*time-best[time] <= x {
			return time
		}
	}
	return -1
}
