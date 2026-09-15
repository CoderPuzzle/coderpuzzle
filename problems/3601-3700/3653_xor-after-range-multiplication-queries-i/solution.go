func xorAfterQueries(nums []int, queries [][]int) int {
	const mod = 1_000_000_007
	// Fold every query into a scratch copy held in int64 cells: walk the
	// indices l, l + k, ... up to r, multiplying each visited element
	// modulo the prime. At most n positions per query keep the total
	// work at n * q.
	values := make([]int64, len(nums))
	for i, value := range nums {
		values[i] = int64(value)
	}
	for _, query := range queries {
		l, r, k := query[0], query[1], query[2]
		v := int64(query[3])
		for idx := l; idx <= r; idx += k {
			// The product reaches ~10^14 before the first fold, so the
			// multiply happens in int64 even though results fit int32.
			values[idx] = values[idx] * v % mod
		}
	}
	// Every element ends below 2^30, so the XOR fits easily.
	result := 0
	for _, value := range values {
		result ^= int(value)
	}
	return result
}
