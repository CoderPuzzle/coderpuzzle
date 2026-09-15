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
	// Mobius function over [1, maxValue] from a linear sieve: mu[1] = 1,
	// mu[n] = 0 once a squared prime divides n, else (-1)^omega(n).
	mu := make([]int64, maxValue+1)
	mu[1] = 1
	sieved := make([]bool, maxValue+1)
	var primes []int
	for i := 2; i <= maxValue; i++ {
		if !sieved[i] {
			primes = append(primes, i)
			mu[i] = -1
		}
		for _, prime := range primes {
			if prime > maxValue/i {
				break
			}
			multiple := i * prime
			sieved[multiple] = true
			if i%prime == 0 {
				mu[multiple] = 0
				break
			}
			mu[multiple] = -mu[i]
		}
	}
	// count[d]: elements divisible by d, the divisor sum of the value
	// frequencies; pairs[d] = count[d] choose 2 counts every pair whose
	// gcd is a multiple of d. Mobius inversion weighs those sums with mu
	// so the proper multiples cancel: exact[d] = sum of mu[k] * pairs[d*k].
	// Pair counts reach n * (n - 1) / 2 ~= 5 * 10^9, past int32 range.
	count := make([]int64, maxValue+1)
	for d := 1; d <= maxValue; d++ {
		var total int64
		for multiple := d; multiple <= maxValue; multiple += d {
			total += int64(freq[multiple])
		}
		count[d] = total
	}
	pairs := make([]int64, maxValue+1)
	for d := 1; d <= maxValue; d++ {
		pairs[d] = count[d] * (count[d] - 1) / 2
	}
	exact := make([]int64, maxValue+1)
	for d := 1; d <= maxValue; d++ {
		var total int64
		multiple := d
		for k := 1; multiple <= maxValue; k++ {
			total += mu[k] * pairs[multiple]
			multiple += d
		}
		exact[d] = total
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
