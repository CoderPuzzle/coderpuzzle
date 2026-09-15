func almostPalindromic(s string) int {
	n := len(s)

	// These arrays describe intervals of the two preceding lengths.
	// Empty and one-character intervals are palindromes. A one-character
	// interval is also almost-palindromic because deleting it leaves the
	// empty palindrome.
	palTwo := make([]bool, n+1)
	almostTwo := make([]bool, n+1)
	palOne := make([]bool, n)
	almostOne := make([]bool, n)
	for i := range palTwo {
		palTwo[i] = true
	}
	for i := range palOne {
		palOne[i] = true
		almostOne[i] = true
	}
	best := 1

	for length := 2; length <= n; length++ {
		count := n - length + 1
		palNow := make([]bool, count)
		almostNow := make([]bool, count)
		for left := 0; left < count; left++ {
			right := left + length - 1
			sameEnds := s[left] == s[right]
			palNow[left] = sameEnds && palTwo[left+1]

			// Delete the right end, delete the left end, or keep both
			// matching ends and use the deletion inside.
			almostNow[left] = palOne[left] || palOne[left+1] || (sameEnds && almostTwo[left+1])
			if almostNow[left] {
				best = length
			}
		}

		palTwo, palOne = palOne, palNow
		almostTwo, almostOne = almostOne, almostNow
	}

	return best
}
