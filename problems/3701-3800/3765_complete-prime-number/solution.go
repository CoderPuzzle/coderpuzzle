func completePrime(num int) bool {
	// Test every prefix and every suffix for primality with trial
	// division on the 6k +- 1 wheel. At most ten digits means at most
	// eighteen slices, and each slice costs at most ~sqrt(num) / 3
	// division steps, so no sieve is ever needed.
	digits := [10]int{}
	count := 0
	for m := num; m > 0; m /= 10 {
		digits[count] = m % 10
		count++
	}
	pow10 := func(k int) int {
		value := 1
		for ; k > 0; k-- {
			value *= 10
		}
		return value
	}
	prime := func(value int64) bool {
		if value < 2 {
			return false
		}
		if value < 4 {
			return true
		}
		if value%2 == 0 || value%3 == 0 {
			return false
		}
		for d := int64(5); d*d <= value; d += 6 {
			if value%d == 0 || value%(d+2) == 0 {
				return false
			}
		}
		return true
	}
	// prefixes: the first k digits, most-significant first; suffixes: the
	// last k digits. Both scans include the whole number itself.
	for head := count - 1; head >= 0; head-- {
		if !prime(int64(num / pow10(head))) {
			return false
		}
	}
	for k := 1; k < count; k++ {
		if !prime(int64(num % pow10(k))) {
			return false
		}
	}
	return true
}
