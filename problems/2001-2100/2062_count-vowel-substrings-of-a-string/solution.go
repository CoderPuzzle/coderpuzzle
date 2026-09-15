func countVowelSubstrings(word string) int {
	total := 0
	for start := 0; start < len(word); start++ {
		mask := 0
		for end := start; end < len(word); end++ {
			bit := vowelSubstringBit(word[end])
			if bit == 0 {
				break
			}
			mask |= bit
			if mask == 31 {
				total++
			}
		}
	}
	return total
}

func vowelSubstringBit(character byte) int {
	switch character {
	case 'a':
		return 1
	case 'e':
		return 2
	case 'i':
		return 4
	case 'o':
		return 8
	case 'u':
		return 16
	default:
		return 0
	}
}
