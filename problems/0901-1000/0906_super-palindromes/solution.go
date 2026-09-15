import (
	"strconv"
)

// The square root of a super-palindrome is itself a palindrome, so the
// candidates come from the roots, never from the values: build every
// palindromic root of up to nine digits by mirroring a half, square it, and
// keep the squares that are palindromes inside the range. Nine digits of root
// suffice because right is below 10^18 and the root of anything below 10^18
// is below 10^9.
func superpalindromesInRange(left string, right string) int {
	low, _ := strconv.ParseInt(left, 10, 64)
	high, _ := strconv.ParseInt(right, 10, 64)
	count := 0
	for length := 1; length <= 9; length++ {
		halfLength := (length + 1) / 2
		for half := pow10(halfLength - 1); half < pow10(halfLength); half++ {
			digits := strconv.FormatInt(half, 10)
			mirrored := []byte(digits[:length-halfLength])
			for i, j := 0, len(mirrored)-1; i < j; i, j = i+1, j-1 {
				mirrored[i], mirrored[j] = mirrored[j], mirrored[i]
			}
			root, _ := strconv.ParseInt(digits+string(mirrored), 10, 64)
			// Every square fits an int64: roots stay below 10^9, so the
			// widest product is 999,999,999^2 < 10^18, an order of magnitude
			// inside int64's 9.22 * 10^18 ceiling.
			square := root * root
			// Roots ascend across widths and halves alike, so squares do
			// too: the first square above `high` ends the scan.
			if square > high {
				return count
			}
			if square >= low && isPalindrome(square) {
				count++
			}
		}
	}
	return count
}

func pow10(exponent int) int64 {
	value := int64(1)
	for i := 0; i < exponent; i++ {
		value *= 10
	}
	return value
}

// A value is a palindrome when its digits read the same both ways.
func isPalindrome(value int64) bool {
	digits := strconv.FormatInt(value, 10)
	for i, j := 0, len(digits)-1; i < j; i, j = i+1, j-1 {
		if digits[i] != digits[j] {
			return false
		}
	}
	return true
}
