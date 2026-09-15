// Two pointers eat the array from both ends; every round folds
// first * 10^digits(last) + last into the running value. This is exactly
// concat(first, last) without any string round-trip, int64-safe because
// ~500 rounds of five-digit concatenations stay far below 2^63.
func findTheArrayConcVal(nums []int) int64 {
	var answer int64
	left, right := 0, len(nums)-1
	for left < right {
		// Peel decimal digits off the last element to build the shift
		// factor the concatenation needs.
		scale := int64(10)
		tail := nums[right]
		for tail >= 10 {
			tail /= 10
			scale *= 10
		}
		answer += int64(nums[left])*scale + int64(nums[right])
		left++
		right--
	}
	// Odd length: the surviving middle element joins the total alone.
	if left == right {
		answer += int64(nums[left])
	}
	return answer
}
