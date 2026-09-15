func partition(s string) [][]string {
	n := len(s)
	// Table of palindrome verdicts for every interval s[i..j].
	isPal := make([][]bool, n)
	for i := range isPal {
		isPal[i] = make([]bool, n)
	}
	// Reverse i ensures the inner interval is computed before any outer
	// interval that reads it.
	for i := n - 1; i >= 0; i-- {
		for j := i; j < n; j++ {
			// Palindrome iff ends match and the interior is empty or pal.
			if s[i] == s[j] && (j-i < 2 || isPal[i+1][j-1]) {
				isPal[i][j] = true
			}
		}
	}

	result := [][]string{}
	current := []string{}

	var backtrack func(start int)
	backtrack = func(start int) {
		if start == n {
			// The pieces tile the whole string: snapshot the partition.
			partition := make([]string, len(current))
			copy(partition, current)
			result = append(result, partition)
			return
		}
		// Increasing end yields shorter first pieces before longer ones,
		// producing the required output order.
		for end := start; end < n; end++ {
			if isPal[start][end] {
				current = append(current, s[start:end+1])
				backtrack(end + 1)
				current = current[:len(current)-1]
			}
		}
	}
	backtrack(0)
	return result
}
