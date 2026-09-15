func convertNumber(s string) string {
	// Left-to-right greedy scan: at most one digit word can start at any
	// position (no word is a prefix of another), so taking the first hit
	// is unambiguous. Lengths 3, 4, 5 cover all ten words.
	words := map[string]string{
		"zero": "0", "one": "1", "two": "2", "five": "5",
		"three": "3", "four": "4", "nine": "9", "six": "6",
		"seven": "7", "eight": "8",
	}
	digits := make([]byte, 0, len(s)/3)
	n := len(s)
	for i := 0; i < n; {
		matched := false
		for length := 3; length <= 5 && i+length <= n; length++ {
			if digit, ok := words[s[i:i+length]]; ok {
				digits = append(digits, digit[0])
				i += length
				matched = true
				break
			}
		}
		if !matched {
			i++
		}
	}
	return string(digits)
}
