func countCommas(n int64) int64 {
	// Numbers with d digits carry (d-1)/3 commas. Walk the comma groups
	// [1000, 999999], [10^6, 10^9 - 1], ...; every number in one group
	// carries the same comma count, so multiply the group size by that count.
	// n <= 10^15 keeps the answer below 4 * 10^15, and every intermediate
	// (lo up to 10^15) fits an int64.
	var total int64
	lo := int64(1000)
	commas := int64(1)
	for lo <= n {
		hi := lo*1000 - 1
		if hi > n {
			hi = n
		}
		total += commas * (hi - lo + 1)
		lo = hi + 1
		commas++
	}
	return total
}
