func generatePalindromes(s string) []string {
	counts := make([]int, 26)
	for i := 0; i < len(s); i++ {
		counts[s[i]-'a']++
	}
	// A palindrome pairs up every letter except at most one middle occupant,
	// so a second odd count means no palindromic arrangement.
	middle := byte(0)
	for i := 0; i < 26; i++ {
		if counts[i]%2 == 1 {
			if middle != 0 {
				// Non-nil so the answer serializes as [], not null.
				return []string{}
			}
			middle = 'a' + byte(i)
		}
	}
	// Quota for the left half, one bucket per distinct letter. Choosing
	// buckets rather than positions makes every half distinct by
	// construction — the duplicate branches a naive per-position
	// permutation would explore never arise.
	half := make([]int, 26)
	for i, count := range counts {
		half[i] = count / 2
	}
	target := len(s) / 2
	results := []string{}
	current := make([]byte, 0, target)

	var walk func()
	walk = func() {
		// Half complete: mirror it around the odd letter, if there is one.
		if len(current) == target {
			palindrome := make([]byte, 0, 2*target+1)
			palindrome = append(palindrome, current...)
			if middle != 0 {
				palindrome = append(palindrome, middle)
			}
			for i := len(current) - 1; i >= 0; i-- {
				palindrome = append(palindrome, current[i])
			}
			results = append(results, string(palindrome))
			return
		}
		// Letters ascend, so earlier positions vary slowest and the
		// palindromes come out in ascending lexicographic order.
		for i := 0; i < 26; i++ {
			if half[i] == 0 {
				continue
			}
			half[i]--
			current = append(current, byte('a'+i))
			walk()
			current = current[:len(current)-1]
			half[i]++
		}
	}
	walk()
	return results
}
