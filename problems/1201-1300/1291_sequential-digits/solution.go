import "strconv"

func sequentialDigits(low int, high int) []int {
	// A sequential number is fully determined by its first digit and its
	// length — at most 9 lengths x 9 starting digits minus the runs that
	// would pass 9. Slide a fixed-length window over "123456789" for each
	// length; every window cut is one candidate, already in ascending
	// order because longer windows only add larger values.
	const digits = "123456789"
	result := []int{}
	for length := 2; length <= 9; length++ {
		for start := 0; start+length <= 9; start++ {
			value, _ := strconv.Atoi(digits[start : start+length])
			if value > high {
				break
			}
			if value >= low {
				result = append(result, value)
			}
		}
	}
	return result
}
