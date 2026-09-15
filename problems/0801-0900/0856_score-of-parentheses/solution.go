// The rules only add siblings and double wrapped wholes, so every score is
// a sum over "()" cores, each worth 2^d where d is the number of pairs open
// around it. One sweep keeps the open-paren depth; a ')' whose predecessor
// is '(' has just closed a core, and the post-decrement depth counts its
// wrappers — add 1 << depth.
func scoreOfParentheses(s string) int {
	score := 0
	depth := 0
	for i := 0; i < len(s); i++ {
		if s[i] == '(' {
			depth++
		} else {
			depth--
			if s[i-1] == '(' {
				score += 1 << depth
			}
		}
	}
	return score
}
