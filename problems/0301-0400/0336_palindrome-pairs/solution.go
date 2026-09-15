import "sort"

func palindromePairs(words []string) [][]int {
	// word -> index: partners are found by hash lookup, not pair scanning.
	index := make(map[string]int)
	for i, w := range words {
		index[w] = i
	}
	results := make(map[[2]int]bool)

	isPalindrome := func(s string) bool {
		a, b := 0, len(s)-1
		for a < b {
			if s[a] != s[b] {
				return false
			}
			a++
			b--
		}
		return true
	}

	for j, w := range words {
		length := len(w)
		// For a concatenation to be a palindrome, one half of w must
		// already be one and the mirror of the other half must exist.
		for cut := 0; cut <= length; cut++ {
			prefix := w[:cut]
			suffix := w[cut:]
			// Palindromic prefix: reverse(suffix) can stand on the left.
			// The != j check stops a word from pairing with itself.
			if isPalindrome(prefix) {
				rev := []rune(suffix)
				for a, b := 0, len(rev)-1; a < b; a, b = a+1, b-1 {
					rev[a], rev[b] = rev[b], rev[a]
				}
				if idx, ok := index[string(rev)]; ok && idx != j {
					results[[2]int{idx, j}] = true
				}
			}
			// Palindromic suffix: reverse(prefix) goes on the right.
			// cut != length avoids re-emitting the full-string case,
			// which the partner word already finds at its cut 0.
			if cut != length && isPalindrome(suffix) {
				rev := []rune(prefix)
				for a, b := 0, len(rev)-1; a < b; a, b = a+1, b-1 {
					rev[a], rev[b] = rev[b], rev[a]
				}
				if idx, ok := index[string(rev)]; ok && idx != j {
					results[[2]int{j, idx}] = true
				}
			}
		}
	}

	out := make([][]int, 0, len(results))
	for pair := range results {
		p := pair
		out = append(out, []int{p[0], p[1]})
	}
	sort.Slice(out, func(a, b int) bool {
		if out[a][0] != out[b][0] {
			return out[a][0] < out[b][0]
		}
		return out[a][1] < out[b][1]
	})
	return out
}
