// After t operations index i has absorbed t*y of decrement plus an extra
// (x - y) every time it was picked, so candidate t is feasible iff the
// required picks fit inside the t operations. The running pick total can
// pass 2^31 before the early exit fires, so products and the accumulator
// stay in int64.
func feasible(nums []int, t int64, x int64, y int64) bool {
	base := t * y
	gain := x - y
	var used int64
	for _, value := range nums {
		if int64(value) > base {
			used += (int64(value) - base + gain - 1) / gain
			if used > t {
				return false
			}
		}
	}
	return true
}

func minOperations(nums []int, x int, y int) int {
	maxValue := nums[0]
	for _, value := range nums {
		if value > maxValue {
			maxValue = value
		}
	}
	low, high := int64(1), (int64(maxValue)+int64(y)-1)/int64(y) // ceil(maxValue / y)
	for low < high {
		mid := low + (high-low)/2
		if feasible(nums, mid, int64(x), int64(y)) {
			high = mid
		} else {
			low = mid + 1
		}
	}
	return int(low)
}
