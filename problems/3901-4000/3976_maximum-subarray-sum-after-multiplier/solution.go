func maxSubarraySum(nums []int, k int) int64 {
	neg := int64(-1 << 62)
	none, multiply, divide, done := neg, neg, neg, neg
	answer := neg
	for _, value := range nums {
		multiplied := int64(value) * int64(k)
		divided := int64(value / k)
		prevNone, prevMultiply, prevDivide, prevDone := none, multiply, divide, done
		if int64(value) > prevNone+int64(value) {
			none = int64(value)
		} else {
			none = prevNone + int64(value)
		}
		multiply = max(multiplied, max(prevNone+multiplied, prevMultiply+multiplied))
		divide = max(divided, max(prevNone+divided, prevDivide+divided))
		done = max(prevMultiply+int64(value), max(prevDivide+int64(value), prevDone+int64(value)))
		answer = max(answer, max(none, max(multiply, max(divide, done))))
	}
	return answer
}
