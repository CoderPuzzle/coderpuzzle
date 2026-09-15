import "strconv"

func countOddLetters(n int) int {
	// Spell every digit as its lowercase word, concatenate in digit
	// order, and count letters: the answer is how many distinct
	// characters end up with an odd frequency.
	words := []string{"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}
	counts := make([]int, 26)
	for _, digit := range strconv.Itoa(n) {
		for _, ch := range words[digit-'0'] {
			counts[ch-'a']++
		}
	}
	odd := 0
	for _, count := range counts {
		if count%2 == 1 {
			odd++
		}
	}
	return odd
}
