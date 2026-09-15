import "sort"

// The sum of two numbers built from the four digits is minimized by giving
// the two smallest digits the tens places, so sort and pair smallest+largest
// into the two two-digit numbers.
func minimumSum(num int) int {
	digits := []int{num / 1000, num / 100 % 10, num / 10 % 10, num % 10}
	sort.Ints(digits)
	return 10*(digits[0]+digits[1]) + digits[2] + digits[3]
}
