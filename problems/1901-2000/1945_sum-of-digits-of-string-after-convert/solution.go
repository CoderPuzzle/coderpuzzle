import "strconv"

// Convert letters to their 1..26 positions as a digit string, then apply
// the digit-sum transform k times. The concatenated value stays a string:
// 100 letters -> up to 200 digits, far beyond any fixed-width integer.
func getLucky(s string, k int) int {
	digits := make([]byte, 0, len(s)*2)
	for i := 0; i < len(s); i++ {
		digits = append(digits, []byte(strconv.Itoa(int(s[i]-'a')+1))...)
	}
	for i := 0; i < k; i++ {
		sum := 0
		for _, d := range digits {
			sum += int(d - '0')
		}
		digits = []byte(strconv.Itoa(sum))
	}
	result, _ := strconv.Atoi(string(digits))
	return result
}
