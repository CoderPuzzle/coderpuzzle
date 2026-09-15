func numberOfWays(s string) int64 {
	var zeros, ones, seq01, seq10, total int64
	for i := 0; i < len(s); i++ {
		if s[i] == '0' {
			total += seq10
			seq01 += ones
			zeros++
		} else {
			total += seq01
			seq10 += zeros
			ones++
		}
	}
	return total
}
