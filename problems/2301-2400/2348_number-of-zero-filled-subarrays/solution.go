func zeroFilledSubarray(nums []int) int64 {
	// Every zero-filled subarray ends at exactly one index, and the ones
	// ending at i are exactly the run of consecutive zeros through i —
	// add the current run length at every zero. Totals reach ~5e9, so
	// accumulate in 64 bits.
	var total int64
	var run int64
	for _, value := range nums {
		if value == 0 {
			run++
			total += run
		} else {
			run = 0
		}
	}
	return total
}
