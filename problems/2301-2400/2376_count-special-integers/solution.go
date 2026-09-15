import "strconv"

func countSpecialNumbers(n int64) int {
	perm := func(a int64, k int64) int64 {
		p := int64(1)
		for i := int64(0); i < k; i++ {
			p *= a - i
		}
		return p
	}

	s := strconv.FormatInt(n, 10)
	L := len(s)
	total := int64(0)
	// Part 1: shorter lengths are all below n. A k-digit special number
	// picks a nonzero first digit, then ordered picks of the remaining 9.
	for k := int64(1); k < int64(L); k++ {
		total += 9 * perm(9, k-1)
	}
	// Part 2: walk n's digits, holding the prefix equal to n so far;
	// `used` is the bitmask of digits fixed in that prefix.
	used := 0
	broke := false
	for i := 0; i < L; i++ {
		d := int(s[i] - '0')
		lo := 0
		if i == 0 {
			lo = 1
		}
		// Try each digit x < d not yet used (x >= 1 at position 0 to bar
		// leading zeros): any completion works, so count the ordered
		// picks for the remaining L-i-1 positions from unused digits.
		for x := lo; x < d; x++ {
			if used>>uint(x)&1 == 0 {
				total += perm(int64(10-(i+1)), int64(L-i-1))
			}
		}
		// Extending with d itself repeats a digit: no same-length
		// special number shares this prefix, so the walk stops.
		if used>>uint(d)&1 == 1 {
			broke = true
			break
		}
		used |= 1 << uint(d)
	}
	if !broke {
		// The walk finished with no repeat, so n itself is special.
		total++
	}
	return int(total)
}
