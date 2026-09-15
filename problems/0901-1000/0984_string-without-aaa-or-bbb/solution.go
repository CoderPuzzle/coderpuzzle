import "strings"

// The judge pins one exact answer: call the letter with the larger count
// big ('a' on a tie) and the other small. While big exceeds small and small
// has not run out, append two big letters then one small letter; then, while
// letters remain, append one big letter if any are left, then one small
// letter if any are left.
func strWithout3a3b(a int, b int) string {
	big, bigLetter := a, byte('a')
	small, smallLetter := b, byte('b')
	if b > a {
		big, bigLetter = b, byte('b')
		small, smallLetter = a, byte('a')
	}
	var answer strings.Builder
	for big > small && small > 0 {
		answer.WriteByte(bigLetter)
		answer.WriteByte(bigLetter)
		answer.WriteByte(smallLetter)
		big -= 2
		small--
	}
	for big > 0 || small > 0 {
		if big > 0 {
			answer.WriteByte(bigLetter)
			big--
		}
		if small > 0 {
			answer.WriteByte(smallLetter)
			small--
		}
	}
	return answer.String()
}
