import "sort"
import "strconv"

func maxProduct(n int) int {
	// All digits are >= 0, so the best pair product is the product of the
	// two largest digits; sorting the (at most 10) digits and taking the
	// top two answers every case, repeated digits included.
	text := strconv.Itoa(n)
	digits := make([]int, len(text))
	for i, d := range text {
		digits[i] = int(d - '0')
	}
	sort.Ints(digits)
	return digits[len(digits)-1] * digits[len(digits)-2]
}
