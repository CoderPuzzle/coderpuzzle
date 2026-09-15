import "strconv"

// One swap can raise exactly one position, and a position is worth more the
// further left it sits, so the best swap moves the largest available digit as
// far left as it can go. Record the last index of each digit value, then scan
// left to right: at the first position where a larger digit occurs later, swap
// in the largest such digit, taken from its LAST occurrence — the tiebreak
// pushes the displaced smaller digit as far right as it can go. No qualifying
// position means num is already maximal and is returned unchanged.
func maximumSwap(num int) int {
	digits := []byte(strconv.Itoa(num))
	last := [10]int{}
	for i, d := range digits {
		last[d-'0'] = i
	}
	for i, d := range digits {
		for value := 9; value > int(d-'0'); value-- {
			if last[value] > i {
				digits[i], digits[last[value]] = digits[last[value]], digits[i]
				result, _ := strconv.Atoi(string(digits))
				return result
			}
		}
	}
	return num
}
