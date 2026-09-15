import "sort"

func maxPalindromesAfterOperations(words []string) int {
	count := [26]int{}
	for _, word := range words {
		for _, char := range word {
			count[char-'a']++
		}
	}
	pairs := 0
	for _, c := range count {
		pairs += c / 2
	}
	halves := make([]int, len(words))
	for index, word := range words {
		halves[index] = len(word) / 2
	}
	sort.Ints(halves)
	made := 0
	for _, half := range halves {
		if half > pairs {
			break
		}
		pairs -= half
		made++
	}
	return made
}
