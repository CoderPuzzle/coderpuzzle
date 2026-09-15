func calculateTime(keyboard string, word string) int {
	var index [26]int
	for i := 0; i < 26; i++ {
		index[keyboard[i]-'a'] = i
	}
	total := 0
	position := 0
	for i := 0; i < len(word); i++ {
		target := index[word[i]-'a']
		d := target - position
		if d < 0 {
			d = -d
		}
		total += d
		position = target
	}
	return total
}
