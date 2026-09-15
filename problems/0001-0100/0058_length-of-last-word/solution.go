// One right-to-left pass: skip the trailing spaces, then count the last
// word's letters until a space or the start of s.
func lengthOfLastWord(s string) int {
	// Trailing spaces belong to no word, so walk them off first.
	i := len(s) - 1
	for i >= 0 && s[i] == ' ' {
		i--
	}
	end := i
	for i >= 0 && s[i] != ' ' {
		i--
	}
	return end - i
}
