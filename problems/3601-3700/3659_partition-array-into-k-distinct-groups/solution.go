func partitionArray(nums []int, k int) bool {
	// Whole groups of exactly k require n to divide evenly, and each
	// occurrence of a value consumes a group of its own, so no value may
	// occur more often than the number of groups.
	n := len(nums)
	if n%k != 0 {
		return false
	}
	count := make(map[int]int)
	mostFrequent := 0
	for _, value := range nums {
		count[value]++
		if count[value] > mostFrequent {
			mostFrequent = count[value]
		}
	}
	return mostFrequent <= n/k
}
