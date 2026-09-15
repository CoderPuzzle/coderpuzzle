func numIdenticalPairs(nums []int) int64 {
	// For each value, the k-th time it is seen forms a good pair with each
	// of the k - 1 occurrences already counted, so adding the running
	// count before bumping it reproduces C(count, 2) per value.
	seen := make(map[int]int64)
	var total int64
	for _, num := range nums {
		total += seen[num]
		seen[num]++
	}
	return total
}
