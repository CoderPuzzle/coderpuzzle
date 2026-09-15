import "strconv"

// Slide a length-k window over the digit string, keeping the window's integer
// value incrementally: drop the leading digit, shift, add the new trailing
// digit. A zero window never divides num.
func divisorSubstrings(num int, k int) int {
	digits := strconv.Itoa(num)
	power := 1
	for i := 0; i < k-1; i++ {
		power *= 10
	}
	window, _ := strconv.Atoi(digits[:k])
	count := 0
	if window != 0 && num%window == 0 {
		count++
	}
	for i := k; i < len(digits); i++ {
		window = (window%power)*10 + int(digits[i]-'0')
		if window != 0 && num%window == 0 {
			count++
		}
	}
	return count
}
