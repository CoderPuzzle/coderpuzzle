// Schoolbook multiplication into a digit array: every digit pair's product
// lands in a known cell, one carry pass normalizes, then the unused leading
// cell is stripped.
func multiply(num1 string, num2 string) string {
	// The product of an m-digit and an n-digit number has at most m + n
	// digits, so accumulate raw digit-pair products into exactly that many
	// cells before carrying anything.
	m, n := len(num1), len(num2)
	digits := make([]int, m+n)
	for i := m - 1; i >= 0; i-- {
		d1 := int(num1[i] - '0')
		for j := n - 1; j >= 0; j-- {
			// Digit i of num1 times digit j of num2 lands at i + j + 1
			// (most-significant-first indexing), so every pair can add
			// into its cell directly; no carrying yet.
			digits[i+j+1] += d1 * int(num2[j]-'0')
		}
	}
	// One right-to-left pass normalizes each cell to a single digit and
	// pushes the overflow one cell left, exactly like schoolbook carrying.
	carry := 0
	for k := len(digits) - 1; k >= 0; k-- {
		total := digits[k] + carry
		digits[k] = total % 10
		carry = total / 10
	}
	// Neither input has a leading zero, so the product has m + n or
	// m + n - 1 digits; strip the unused leading cell, keeping at least
	// one digit so "0" operands yield "0" with no special case.
	start := 0
	for start < len(digits)-1 && digits[start] == 0 {
		start++
	}
	result := make([]byte, 0, len(digits)-start)
	for _, d := range digits[start:] {
		result = append(result, byte('0'+d))
	}
	return string(result)
}
