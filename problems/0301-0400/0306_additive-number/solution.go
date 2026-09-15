import "strings"

func isAdditiveNumber(num string) bool {
	// The first two numbers fix the whole sequence, so try each split of
	// them and let string addition verify the remainder. No machine
	// integers anywhere: rejected candidates can outgrow 64 bits.
	n := len(num)
	for i := 1; i < n; i++ {
		if !valid(num, 0, i) {
			continue
		}
		// j < n leaves at least one digit for the third number.
		for j := i + 1; j < n; j++ {
			if !valid(num, i, j) {
				continue
			}
			if consumes(num, num[:i], num[i:j], j) {
				return true
			}
		}
	}
	return false
}

func valid(num string, start, end int) bool {
	// Multi-digit numbers may not open with '0'; a lone 0 is legal.
	return end-start == 1 || num[start] != '0'
}

func consumes(num, first, second string, start int) bool {
	// Greedy walk: the next number's digits are exactly the sum's
	// digits, so its length is never a choice.
	for start < len(num) {
		total := add(first, second)
		if !strings.HasPrefix(num[start:], total) {
			return false
		}
		first, second = second, total
		start += len(total)
	}
	return true
}

func add(a, b string) string {
	// Schoolbook addition on digit characters, least significant
	// first, carrying as we go.
	digits := make([]byte, 0, len(a)+len(b)+1)
	carry := 0
	i, j := len(a)-1, len(b)-1
	for i >= 0 || j >= 0 || carry > 0 {
		total := carry
		if i >= 0 {
			total += int(a[i] - '0')
			i--
		}
		if j >= 0 {
			total += int(b[j] - '0')
			j--
		}
		digits = append(digits, byte('0'+total%10))
		carry = total / 10
	}
	for lo, hi := 0, len(digits)-1; lo < hi; lo, hi = lo+1, hi-1 {
		digits[lo], digits[hi] = digits[hi], digits[lo]
	}
	return string(digits)
}
