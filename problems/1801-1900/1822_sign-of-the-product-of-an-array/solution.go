// Only the sign of the product is asked for, so the up-to-1000-factor
// product never needs to exist: a zero factor forces 0, and otherwise each
// negative factor flips the running sign.
func arraySign(nums []int) int {
	sign := 1
	for _, x := range nums {
		if x == 0 {
			return 0
		}
		if x < 0 {
			sign = -sign
		}
	}
	return sign
}
