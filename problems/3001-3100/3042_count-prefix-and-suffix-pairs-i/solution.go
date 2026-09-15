func countPrefixSuffixPairs(words []string) int {
	isPrefixAndSuffix := func(str1, str2 string) bool {
		size1, size2 := len(str1), len(str2)
		if size1 > size2 {
			return false
		}
		for index := 0; index < size1; index++ {
			if str1[index] != str2[index] {
				return false
			}
			if str1[index] != str2[size2-size1+index] {
				return false
			}
		}
		return true
	}

	total := 0
	for i := 0; i < len(words); i++ {
		for j := i + 1; j < len(words); j++ {
			if isPrefixAndSuffix(words[i], words[j]) {
				total++
			}
		}
	}
	return total
}
