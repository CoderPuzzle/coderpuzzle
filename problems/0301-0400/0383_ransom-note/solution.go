// The magazine is a budget: tally its letters, one slot per letter of the
// alphabet, then spend the note against that budget.
func canConstruct(ransomNote string, magazine string) bool {
	var counts [26]int
	for i := range magazine {
		counts[magazine[i]-'a']++
	}
	// A slot dipping below zero means the magazine cannot supply that
	// letter often enough — each of its letters is usable only once.
	for i := range ransomNote {
		counts[ransomNote[i]-'a']--
		if counts[ransomNote[i]-'a'] < 0 {
			return false
		}
	}
	return true
}
