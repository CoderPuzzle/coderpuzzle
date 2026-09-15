import "strconv"

func smallestNumber(n string) string {
	// The wire carries n as decimal text; 10^18 fits easily in int64.
	value, _ := strconv.ParseInt(n, 10, 64)
	if value == 1 {
		return "1"
	}
	// Largest-first trial division packs the factors into as few digits
	// as possible and leaves the smallest remainders behind.
	var counts [10]int
	for digit := 9; digit >= 2; digit-- {
		for value%int64(digit) == 0 {
			counts[digit]++
			value /= int64(digit)
		}
	}
	if value != 1 {
		return "-1"
	}
	answer := make([]byte, 0, 24)
	for digit := 2; digit <= 9; digit++ {
		for i := 0; i < counts[digit]; i++ {
			answer = append(answer, byte('0'+digit))
		}
	}
	return string(answer)
}
