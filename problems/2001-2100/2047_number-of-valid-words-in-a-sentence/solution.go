import "strings"

func countValidWords(sentence string) int {
	validWords := 0
	for _, token := range strings.Fields(sentence) {
		if isValid(token) {
			validWords++
		}
	}
	return validWords
}

func isValid(token string) bool {
	hyphens := 0
	punctuation := 0

	for index := 0; index < len(token); index++ {
		character := token[index]
		if isLetter(character) {
			continue
		}
		if character == '-' {
			hyphens++
			if hyphens > 1 || index == 0 || index+1 == len(token) || !isLetter(token[index-1]) || !isLetter(token[index+1]) {
				return false
			}
		} else if character == '!' || character == '.' || character == ',' {
			punctuation++
			if punctuation > 1 || index+1 != len(token) {
				return false
			}
		} else {
			return false
		}
	}

	return true
}

func isLetter(character byte) bool {
	return character >= 'a' && character <= 'z'
}
