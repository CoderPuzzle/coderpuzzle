func smallestBalancedIndex(nums []int) int {
	// Suffix products saturate at total+1: any product above the total
	// sum can never equal a prefix sum, so the sentinel value compares
	// correctly while staying inside an int64.
	n := len(nums)
	var total int64
	for _, v := range nums {
		total += int64(v)
	}
	cap_ := total + 1
	suffix := make([]int64, n+1)
	suffix[n] = 1
	prod := int64(1)
	for i := n - 1; i >= 0; i-- {
		if prod > cap_/int64(nums[i]) {
			prod = cap_
		} else {
			prod *= int64(nums[i])
		}
		suffix[i] = prod
	}
	var left int64
	for i, v := range nums {
		if left == suffix[i+1] {
			return i
		}
		left += int64(v)
	}
	return -1
}
