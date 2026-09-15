import "strconv"

func countSymmetricIntegers(low, high int) int {
	// An even-length decimal string is symmetric exactly when its two
	// halves have equal digit sums; odd-length numbers are never
	// symmetric. Digit counts stay below 6 on the constraint domain.
	count := 0
	for value := low; value <= high; value++ {
		digits := strconv.Itoa(value)
		n := len(digits)
		if n%2 != 0 {
			continue
		}
		half := n / 2
		firstSum := 0
		lastSum := 0
		for i := 0; i < half; i++ {
			firstSum += int(digits[i] - '0')
			lastSum += int(digits[half+i] - '0')
		}
		if firstSum == lastSum {
			count++
		}
	}
	return count
}
