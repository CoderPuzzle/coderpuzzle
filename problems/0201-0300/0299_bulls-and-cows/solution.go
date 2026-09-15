import "fmt"

// Bulls are positional matches, tallied directly. Every other digit drops
// into one of two 10-slot counters — one per side — and the cows are the
// multiset overlap of the two leftovers, min per digit.
func getHint(secret string, guess string) string {
	bulls := 0
	var secretLeft, guessLeft [10]int
	for index := 0; index < len(secret); index++ {
		if secret[index] == guess[index] {
			bulls++
		} else {
			// Only unmatched positions feed the cow pools: an exact match
			// consumes one copy of the digit on both sides up front.
			secretLeft[secret[index]-'0']++
			guessLeft[guess[index]-'0']++
		}
	}
	cows := 0
	for digit := 0; digit < 10; digit++ {
		// A leftover guess digit needs a leftover secret partner, so any
		// surplus copy beyond the other counter simply dies.
		cows += min(secretLeft[digit], guessLeft[digit])
	}
	return fmt.Sprintf("%dA%dB", bulls, cows)
}
