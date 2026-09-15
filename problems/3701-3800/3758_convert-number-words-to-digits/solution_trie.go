func convertNumber(s string) string {
	// Trie over the ten digit words: nested maps keyed by letter, with "$"
	// marking a node where a word ends. No word is a prefix of another, so
	// a walk from any position crosses at most one terminal, and the first
	// terminal reached is exactly where the word ends.
	type node map[string]any
	root := node{}
	for word, digit := range map[string]string{
		"zero": "0", "one": "1", "two": "2", "three": "3", "four": "4",
		"five": "5", "six": "6", "seven": "7", "eight": "8", "nine": "9",
	} {
		current := root
		for _, ch := range word {
			key := string(ch)
			child, ok := current[key].(node)
			if !ok {
				child = node{}
				current[key] = child
			}
			current = child
		}
		current["$"] = digit
	}
	digits := make([]byte, 0, len(s)/3)
	n := len(s)
	for i := 0; i < n; {
		current := root
		j := i
		hit := ""
		for j < n {
			child, ok := current[string(s[j])].(node)
			if !ok {
				break
			}
			current = child
			j++
			if terminal, ok := current["$"].(string); ok {
				hit = terminal
				break
			}
		}
		if hit == "" {
			i++
		} else {
			digits = append(digits, hit[0])
			i = j
		}
	}
	return string(digits)
}
