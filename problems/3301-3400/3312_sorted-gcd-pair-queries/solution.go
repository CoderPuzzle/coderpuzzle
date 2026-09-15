func gcdValues(nums []int, queries []int64) []int {
	maxValue := 0
	for _, value := range nums {
		if value > maxValue {
			maxValue = value
		}
	}
	freq := make([]int32, maxValue+1)
	for _, value := range nums {
		freq[value]++
	}
	// pairs_with_gcd[d]: pairs whose gcd is exactly d. Processing d from
	// maxValue down, pairs sharing divisor d minus the already-fixed
	// exact counts of every proper multiple of d (inclusion-exclusion).
	// Pair counts reach n * (n - 1) / 2 ~= 5 * 10^9, past int32 range.
	exact := make([]int64, maxValue+1)
	for d := maxValue; d >= 1; d-- {
		var count int64
		for multiple := d; multiple <= maxValue; multiple += d {
			count += int64(freq[multiple])
		}
		pairs := count * (count - 1) / 2
		for multiple := 2 * d; multiple <= maxValue; multiple += d {
			pairs -= exact[multiple]
		}
		exact[d] = pairs
	}
	prefix := make([]int64, maxValue+1)
	var running int64
	for d := 1; d <= maxValue; d++ {
		running += exact[d]
		prefix[d] = running
	}
	// Query indices reach n * (n - 1) / 2 - 1 ~= 5 * 10^9 and arrive as
	// int64s; each answer is a gcd, at most 5 * 10^4.
	answer := make([]int, len(queries))
	for i, query := range queries {
		lo, hi := 1, maxValue
		target := query + 1
		for lo < hi {
			mid := int(uint(lo+hi) >> 1)
			if prefix[mid] >= target {
				hi = mid
			} else {
				lo = mid + 1
			}
		}
		answer[i] = lo
	}
	return answer
}
