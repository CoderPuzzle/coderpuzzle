func countGoodIntegers(n int, k int) int64 {
	half := (n + 1) / 2
	fact := make([]int64, n+1)
	fact[0] = 1
	for i := 1; i <= n; i++ {
		fact[i] = fact[i-1] * int64(i)
	}
	seen := make(map[string]bool)
	limit := 1
	for i := 0; i < half; i++ {
		limit *= 10
	}
	prefix := make([]int, half)
	seq := make([]int, n)
	for first := 0; first < limit; first++ {
		v := first
		for i := 0; i < half; i++ {
			prefix[i] = v % 10
			v /= 10
		}
		if prefix[half-1] == 0 {
			continue
		}
		length := 0
		for i := half - 1; i >= 0; i-- {
			seq[length] = prefix[i]
			length++
		}
		if n%2 == 0 {
			for i := 0; i < half; i++ {
				seq[length] = prefix[i]
				length++
			}
		} else {
			for i := 1; i < half; i++ {
				seq[length] = prefix[i]
				length++
			}
		}
		counts := make([]int, 10)
		value := 0
		for i := 0; i < length; i++ {
			d := seq[i]
			counts[d]++
			value = (value*10 + d) % k
		}
		if value == 0 {
			key := make([]byte, 10)
			for d := 0; d < 10; d++ {
				key[d] = byte('0' + counts[d])
			}
			seen[string(key)] = true
		}
	}
	var answer int64
	for key := range seen {
		total := fact[n]
		var lead int64
		hasZero := false
		for d := 0; d < 10; d++ {
			c := int64(key[d] - '0')
			if d == 0 && c > 0 {
				hasZero = true
			}
			total /= fact[c]
		}
		if hasZero {
			lead = fact[n-1]
			for d := 0; d < 10; d++ {
				c := int64(key[d] - '0')
				if d == 0 {
					c--
				}
				lead /= fact[c]
			}
			total -= lead
		}
		answer += total
	}
	return answer
}
