// A palindrome is fixed by its first half — mirroring the half without
// repeating its last digit rebuilds it, and larger halves give larger
// palindromes within a length. A palindrome with an even number of digits
// has alternating digit sum 0, so it is divisible by 11: 11 is the
// family's only prime, and above it only odd lengths are scanned, each
// candidate >= n trial-divided up to its square root. The [2, 2*10^8]
// answer guarantee keeps the scan inside the 9-digit class, so every value
// built fits an int with room to spare.
func primePalindrome(n int) int {
	if n <= 11 {
		// every prime below 12 is already a palindrome
		x := n
		if x < 2 {
			x = 2
		}
		for !isPrime(x) {
			x++
		}
		return x
	}
	for lo := 10; ; lo *= 10 {
		for half := lo; half < lo*10; half++ {
			x := half
			for t := half / 10; t > 0; t /= 10 {
				x = x*10 + t%10
			}
			if x >= n && isPrime(x) {
				return x
			}
		}
	}
}

// Trial division: 2 first, then odd divisors up to the square root.
func isPrime(x int) bool {
	if x < 2 {
		return false
	}
	if x%2 == 0 {
		return x == 2
	}
	for d := 3; d*d <= x; d += 2 {
		if x%d == 0 {
			return false
		}
	}
	return true
}
