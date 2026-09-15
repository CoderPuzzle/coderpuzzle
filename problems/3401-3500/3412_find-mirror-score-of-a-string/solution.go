// One stack of unmarked indices per letter: the closest unmarked mirror
// candidate is always the most recently pushed one.
func calculateScore(s string) int64 {
	stacks := make([][]int32, 26)
	var score int64
	for i := 0; i < len(s); i++ {
		c := int(s[i] - 'a')
		mirror := stacks[25-c]
		if n := len(mirror); n > 0 {
			// Match with the nearest unmarked mirror and mark both.
			score += int64(i) - int64(mirror[n-1])
			stacks[25-c] = mirror[:n-1]
		} else {
			stacks[c] = append(stacks[c], int32(i))
		}
	}
	return score
}
