import (
	"sort"
	"strconv"
)

// Greedy over sorted digits: ascending order, dealt alternately to
// num1 and num2, puts the small digits where they carry the most
// significance and interleaves so neither number grows a fat leading
// digit; the exchange argument shows any other deal has both parts at
// least as large. Sums stay under 2*10^5 (at most 5 significant digits
// per part), well inside an int.
func splitNum(num int) int {
	digits := []byte(strconv.Itoa(num))
	sort.Slice(digits, func(i, j int) bool { return digits[i] < digits[j] })
	num1, num2 := 0, 0
	for i, d := range digits {
		if i%2 == 0 {
			num1 = num1*10 + int(d-'0')
		} else {
			num2 = num2*10 + int(d-'0')
		}
	}
	return num1 + num2
}
