import "strconv"

// Prefix-count reduction: occurrences in [low, high] = f(high) - f(low-1).
func digitsCount(d int, low int, high int) int {
	return int(countUpTo(d, int64(high)) - countUpTo(d, int64(low)-1))
}

func countUpTo(d int, n int64) int64 {
	if n <= 0 {
		return 0
	}
	s := strconv.FormatInt(n, 10)
	length := len(s)
	var total int64 = 0
	// Count, per digit position, the numbers <= n with d there:
	// n = highPart * 10^power + cur * 10^power + lowPart.
	for i := 0; i < length; i++ {
		var highPart int64
		if i > 0 {
			highPart, _ = strconv.ParseInt(s[:i], 10, 64)
		}
		cur := int64(s[i] - '0')
		var lowPart int64
		if i+1 < length {
			lowPart, _ = strconv.ParseInt(s[i+1:], 10, 64)
		}
		var power int64 = 1
		for k := 0; k < length-1-i; k++ {
			power *= 10
		}
		if d == 0 {
			// Leading zeros are never written: skip a zero high part, and
			// the -1 forbids a leading zero on this position.
			if highPart >= 1 {
				if cur > 0 {
					total += highPart * power
				} else {
					total += (highPart-1)*power + lowPart + 1
				}
			}
		} else {
			// cur > d: prefix-equal numbers may put anything below;
			// cur == d: only suffixes up to lowPart still qualify.
			if cur > int64(d) {
				total += (highPart + 1) * power
			} else if cur == int64(d) {
				total += highPart*power + lowPart + 1
			} else {
				total += highPart * power
			}
		}
	}
	return total
}
