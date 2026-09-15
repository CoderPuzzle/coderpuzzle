// isPal[l][r] marks s[l..r] as a palindrome; entries are filled by
// increasing length so each one depends on a shorter interval. Three
// non-empty parts are fixed by two cuts i and j; every cut pair is tried
// against the table.
func checkPartitioning(s string) bool {
	n := len(s)
	isPal := make([][]bool, n)
	for i := range isPal {
		isPal[i] = make([]bool, n)
		isPal[i][i] = true
	}
	for i := 0; i+1 < n; i++ {
		if s[i] == s[i+1] {
			isPal[i][i+1] = true
		}
	}
	for length := 3; length <= n; length++ {
		for l := 0; l+length <= n; l++ {
			r := l + length - 1
			if s[l] == s[r] && isPal[l+1][r-1] {
				isPal[l][r] = true
			}
		}
	}
	for i := 1; i < n-1; i++ {
		if !isPal[0][i-1] {
			continue
		}
		for j := i + 1; j < n; j++ {
			if isPal[i][j-1] && isPal[j][n-1] {
				return true
			}
		}
	}
	return false
}
