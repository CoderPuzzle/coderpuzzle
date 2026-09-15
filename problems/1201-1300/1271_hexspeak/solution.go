import "strconv"

func toHexspeak(num string) string {
	// Peel hex digits by repeated divmod — no format strings, so the digit
	// alphabet stays explicit: 0->O, 1->I, 10..15 -> A..F, and digits 2..9
	// make the representation invalid.
	digits := []byte{}
	n, _ := strconv.ParseInt(num, 10, 64)
	for {
		digits = append(digits, byte(n%16))
		n /= 16
		if n == 0 {
			break
		}
	}
	letters := []byte{}
	for i := len(digits) - 1; i >= 0; i-- {
		r := digits[i]
		if r >= 2 && r <= 9 {
			return "ERROR"
		}
		if r <= 1 {
			if r == 0 {
				letters = append(letters, 'O')
			} else {
				letters = append(letters, 'I')
			}
		} else {
			letters = append(letters, 'A'+r-10)
		}
	}
	return string(letters)
}
