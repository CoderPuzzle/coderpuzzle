// Schoolbook addition: walk both numbers from their right ends one column
// at a time, add the two digits plus the carry, and emit total % 10. The
// whole inputs are never converted to integers.
func addStrings(num1 string, num2 string) string {
	i, j, carry := len(num1)-1, len(num2)-1, 0
	digits := make([]byte, 0, len(num1)+len(num2)+1)
	// Looping on "carry > 0" appends the final leading 1 when the sum is
	// one digit longer; each side contributes only while in range.
	for i >= 0 || j >= 0 || carry > 0 {
		total := carry
		if i >= 0 {
			total += int(num1[i] - '0')
			i--
		}
		if j >= 0 {
			total += int(num2[j] - '0')
			j--
		}
		digits = append(digits, byte('0'+total%10))
		carry = total / 10
	}
	// Digits came out least-significant first; flip in place before
	// converting to a string.
	for left, right := 0, len(digits)-1; left < right; left, right = left+1, right-1 {
		digits[left], digits[right] = digits[right], digits[left]
	}
	return string(digits)
}
