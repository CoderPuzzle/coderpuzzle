import "math"

// Search palindromes, not products: a 2n-digit palindrome is fixed by its
// first half, so mirror halves downward and test each candidate for a factor
// pair — the first that splits into two n-digit factors is the answer.
func largestPalindrome(n int) int {
	// Every 2-digit palindrome is a multiple of 11, which no product of two
	// 1-digit factors can be, so the answer is the palindrome 9 = 3 * 3.
	if n == 1 {
		return 9
	}
	top := 1
	for i := 0; i < n; i++ {
		top *= 10
	}
	hi, lo := int64(top-1), int64(top/10)
	for half := hi; half >= lo; half-- {
		// Mirror the half arithmetically: append its digits, least
		// significant first, to build the 2n-digit candidate.
		palindrome, rest := half, half
		for rest > 0 {
			palindrome = palindrome*10 + rest%10
			rest /= 10
		}
		// Float64 sqrt rounds above 2^53, so settle the floor exactly.
		root := int64(math.Sqrt(float64(palindrome)))
		for root*root > palindrome {
			root--
		}
		for (root+1)*(root+1) <= palindrome {
			root++
		}
		// The larger factor of any pair lies between hi and the integer
		// square root; the cofactor check rejects pairs whose cofactor runs
		// a digit long.
		for factor := hi; factor >= root; factor-- {
			if palindrome%factor == 0 {
				other := palindrome / factor
				if other >= lo && other <= hi {
					return int(palindrome % 1337)
				}
			}
		}
	}
	// Every width from 2 up has a palindromic product; this is only the
	// exit the compiler needs.
	return 0
}
