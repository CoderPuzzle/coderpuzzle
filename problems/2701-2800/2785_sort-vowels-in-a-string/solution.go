import "sort"

func sortVowels(s string) string {
	// Consonants never move; only vowel values permute among the vowel
	// slots. Collect the vowels, sort them by ASCII (every uppercase
	// vowel sorts before every lowercase one, e.g. 'O' < 'e'), and pour
	// them back into the vowel slots left to right.
	isVowel := func(c byte) bool {
		switch c {
		case 'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U':
			return true
		default:
			return false
		}
	}
	vowels := []byte{}
	for k := 0; k < len(s); k++ {
		if isVowel(s[k]) {
			vowels = append(vowels, s[k])
		}
	}
	sort.Slice(vowels, func(a, b int) bool { return vowels[a] < vowels[b] })
	result := []byte(s)
	i := 0
	for k := 0; k < len(result); k++ {
		if isVowel(result[k]) {
			result[k] = vowels[i]
			i++
		}
	}
	return string(result)
}
