func countPalindromes(s string) int {
	// A length-5 palindrome has the shape a b c b a. Iterate over each
	// position as the center c: the "ab" pair must sit strictly before it
	// and the "ba" pair strictly after. A suffix table answers the right
	// side for every center in 100 lookups; the left side grows on the fly
	// during the same left-to-right sweep.
	const mod = 1000000007
	n := len(s)
	digits := make([]int, n)
	for i := 0; i < n; i++ {
		digits[i] = int(s[i] - '0')
	}

	// suff[i][a][b] = number of "ab" subsequences in s[i:]
	suff := make([][10][10]int, n+1)
	var cnt [10]int // digit counts in the current suffix s[i:]
	for i := n - 1; i >= 0; i-- {
		d := digits[i]
		suff[i] = suff[i+1]
		for b := 0; b < 10; b++ {
			suff[i][d][b] += cnt[b] // pairs (i, j) whose first char is s[i]
		}
		cnt[d]++
	}

	// left[a][b] = number of "ab" subsequences in s[:k]
	var left [10][10]int
	var lcnt [10]int // digit counts in s[:k]
	ans := 0
	for k := 0; k < n; k++ {
		d := digits[k]
		for a := 0; a < 10; a++ {
			for b := 0; b < 10; b++ {
				ans = (ans + left[a][b]*suff[k+1][b][a]) % mod
			}
		}
		for a := 0; a < 10; a++ {
			left[a][d] += lcnt[a] // pairs (p, k) whose second char is s[k]
		}
		lcnt[d]++
	}
	return ans
}
