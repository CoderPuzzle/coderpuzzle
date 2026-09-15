import "strconv"

func validDigit(n int, x int) bool {
	digits := strconv.Itoa(n)
	target := byte('0' + x)
	found := false
	for i := range digits {
		if digits[i] == target {
			found = true
		}
	}
	return found && digits[0] != target
}
