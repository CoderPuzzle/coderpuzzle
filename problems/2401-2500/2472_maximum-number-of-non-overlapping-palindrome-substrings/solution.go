func maxPalindromes(s string, k int) int {
	// For each end index r, best[r] is the largest start l of a palindrome
	// s[l..r] with length at least k. Among all palindromes ending at r, the
	// one starting latest leaves the most room on the left and reaches the
	// biggest dp[l], since dp never decreases.
	n := len(s)
	best := make([]int, n)
	for i := range best {
		best[i] = -1
	}
	for center := 0; center < n; center++ {
		l, r := center, center
		for l >= 0 && r < n && s[l] == s[r] {
			if r-l+1 >= k && l > best[r] {
				best[r] = l
			}
			l--
			r++
		}
	}
	for center := 0; center+1 < n; center++ {
		l, r := center, center+1
		for l >= 0 && r < n && s[l] == s[r] {
			if r-l+1 >= k && l > best[r] {
				best[r] = l
			}
			l--
			r++
		}
	}
	// dp[i] = answer for the prefix s[0..i-1]; either skip index i-1 or
	// take the latest-starting palindrome that ends there.
	dp := make([]int, n+1)
	for r := 0; r < n; r++ {
		dp[r+1] = dp[r]
		if l := best[r]; l != -1 && dp[l]+1 > dp[r+1] {
			dp[r+1] = dp[l] + 1
		}
	}
	return dp[n]
}
