import "strconv"

func minimumFlips(n int) int {
	// The binary form without leading zeros.
	s := strconv.FormatUint(uint64(n), 2)
	// Walk inward from both ends. When the two bits of a pair differ, each
	// end sits on a position whose required bit is the opposite end's bit,
	// so the pair pays exactly two flips.
	flips := 0
	for left, right := 0, len(s)-1; left < right; left, right = left+1, right-1 {
		if s[left] != s[right] {
			flips += 2
		}
	}
	return flips
}
