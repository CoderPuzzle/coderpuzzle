import "strconv"

func isFascinating(n int) bool {
	digits := strconv.Itoa(n) + strconv.Itoa(2*n) + strconv.Itoa(3*n)
	if len(digits) != 9 {
		return false
	}

	seen := [10]bool{}
	for _, character := range digits {
		digit := int(character - '0')
		if digit == 0 || seen[digit] {
			return false
		}
		seen[digit] = true
	}
	return true
}
