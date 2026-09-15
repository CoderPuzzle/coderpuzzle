// The three legal usages differ only in how many capitals the word holds
// and where they sit, so one sweep that counts capitals in the ASCII
// upper range captures everything there is to check.
func detectCapitalUse(word string) bool {
	capitals := 0
	for i := range word {
		if word[i] >= 'A' && word[i] <= 'Z' {
			capitals++
		}
	}
	// No capitals is the all-lowercase word, every character a capital
	// is the all-caps word, and a lone capital is legal only when it
	// leads the word.
	first := word[0]
	return capitals == 0 || capitals == len(word) || (capitals == 1 && first >= 'A' && first <= 'Z')
}
