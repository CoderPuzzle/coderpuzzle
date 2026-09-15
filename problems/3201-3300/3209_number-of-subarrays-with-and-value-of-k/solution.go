func countSubarrays(nums []int, k int) int64 {
	// Suffix ANDs ending at one index take at most ~30 distinct values:
	// walking the left end rightward can only clear bits, so every value
	// change drops at least one bit. (value, count) buckets make the
	// scan O(n * 30) instead of enumerating all subarrays. The answer
	// reaches n * (n + 1) / 2 = 5,000,050,000, past int32 range, so it
	// accumulates in an int64.
	var total int64
	values := make([]int, 32)
	counts := make([]int64, 32)
	nextValues := make([]int, 32)
	nextCounts := make([]int64, 32)
	size := 0
	for _, value := range nums {
		newSize := 1
		nextValues[0] = value
		nextCounts[0] = 1
		for i := 0; i < size; i++ {
			merged := values[i] & value
			if nextValues[newSize-1] == merged {
				nextCounts[newSize-1] += counts[i]
			} else {
				nextValues[newSize] = merged
				nextCounts[newSize] = counts[i]
				newSize++
			}
		}
		values, nextValues = nextValues, values
		counts, nextCounts = nextCounts, counts
		size = newSize
		for i := 0; i < size; i++ {
			if values[i] == k {
				total += counts[i]
			}
		}
	}
	return total
}
