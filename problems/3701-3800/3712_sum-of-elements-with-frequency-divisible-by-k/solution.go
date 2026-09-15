func sumDivisibleByK(nums []int, k int) int {
	// Qualification is decided per value: drop every element into the
	// bucket of its own value; values are bounded by 100, so the value
	// itself indexes a fixed array of counters.
	counts := [101]int{}
	for _, num := range nums {
		counts[num]++
	}
	// A bucket qualifies when its count is a positive multiple of k; it
	// then contributes its value once per occurrence.
	total := 0
	for value := 1; value <= 100; value++ {
		if counts[value] > 0 && counts[value]%k == 0 {
			total += value * counts[value]
		}
	}
	return total
}
