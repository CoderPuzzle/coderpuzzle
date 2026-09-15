func numDupDigitsAtMostN(n int) int {
	// Complement counting: tally numbers in [1, n] with all-distinct digits.
	digits := []int{}
	for t := n; t > 0; t /= 10 {
		digits = append(digits, t%10)
	}
	for i, j := 0, len(digits)-1; i < j; i, j = i+1, j-1 {
		digits[i], digits[j] = digits[j], digits[i]
	}
	length := len(digits)

	// Every length strictly shorter than n's own length:
	// 9 first digits (no leading zero), then 9*8*7*...
	distinct := 0
	for d := 1; d < length; d++ {
		prod := 9
		for i := 1; i < d; i++ {
			prod *= 10 - i
		}
		distinct += prod
	}

	// Walk n's own digit string prefix by prefix.
	usedMask := 0
	repeated := false
	for i := 0; i < length; i++ {
		digit := digits[i]
		start := 0
		if i == 0 {
			start = 1
		}
		// Each smaller unused candidate digit fixes a distinct prefix; the
		// remaining slots take any falling permutation of unused digits.
		smaller := 0
		for cand := start; cand < digit; cand++ {
			if usedMask&(1<<cand) == 0 {
				smaller++
			}
		}
		remaining := length - i - 1
		perms := 1
		avail := 10 - (i + 1)
		for r := 0; r < remaining; r++ {
			perms *= avail
			avail--
		}
		distinct += smaller * perms
		// A repeated digit here means no longer number shares this prefix.
		if usedMask&(1<<digit) != 0 {
			repeated = true
			break
		}
		usedMask |= 1 << digit
	}
	// The walk never broke: n itself has all-distinct digits.
	if !repeated {
		distinct++
	}

	return n - distinct
}
