func countCompleteDayPairs(hours []int) int64 {
	// One left-to-right pass keeps a running count per residue class;
	// before joining its own bucket, each index adds the number of
	// earlier values carrying the complementary residue (24 - r) % 24.
	// The pair count reaches C(500000, 2) = 124999750000 at the bounds,
	// far beyond an int32, so accumulate in an int64.
	var counts [24]int
	var answer int64
	for _, value := range hours {
		r := value % 24
		answer += int64(counts[(24-r)%24])
		counts[r]++
	}
	return answer
}
