func missingNumber(nums []int) int {
	n := len(nums)
	// Sum what is actually present.
	total := 0
	for _, value := range nums {
		total += value
	}
	// n distinct values from 0..n: the one absent value is the full-range
	// total n(n+1)/2 minus this sum; n and n+1 are consecutive, so the
	// product is always even and the division by 2 is exact.
	return n*(n+1)/2 - total
}
