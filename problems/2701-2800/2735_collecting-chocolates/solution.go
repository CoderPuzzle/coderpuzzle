// Try every rotation count k in [0, n): after k operations, buying type t
// costs nums[(t - k) mod n], so each step only adds one new candidate price
// per type on top of the ones already seen.
func minCost(nums []int, x int) int64 {
	n := len(nums)
	// cheapest[t] tracks the lowest price seen so far for type t; totals
	// reach about 2 * 10^12, so accumulate in int64.
	cheapest := make([]int64, n)
	var answer int64
	for t := 0; t < n; t++ {
		cheapest[t] = int64(nums[t])
		answer += int64(nums[t])
	}
	for rotations := 1; rotations < n; rotations++ {
		var total int64
		for t := 0; t < n; t++ {
			price := int64(nums[(t-rotations+n)%n])
			if price < cheapest[t] {
				cheapest[t] = price
			}
			total += cheapest[t]
		}
		if candidate := total + int64(rotations)*int64(x); candidate < answer {
			answer = candidate
		}
	}
	return answer
}
