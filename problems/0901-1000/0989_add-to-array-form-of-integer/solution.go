// `num` can hold 10⁴ digits, far past any fixed-width integer, so the
// addition runs schoolbook-style: right to left, one digit at a time, with
// `k` itself seeding the running carry.
func addToArrayForm(num []int, k int) []int {
	carry := k
	result := make([]int, 0, len(num)+5)
	for i := len(num) - 1; i >= 0; i-- {
		carry += num[i]
		result = append(result, carry%10)
		carry /= 10
	}
	// whatever of k outlives num keeps flowing out one digit at a time
	for carry > 0 {
		result = append(result, carry%10)
		carry /= 10
	}
	// digits were emitted least-significant first
	for left, right := 0, len(result)-1; left < right; left, right = left+1, right-1 {
		result[left], result[right] = result[right], result[left]
	}
	return result
}
