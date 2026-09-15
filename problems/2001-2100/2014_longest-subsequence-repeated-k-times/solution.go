func longestSubsequenceRepeatedK(s string, k int) string {
	quotas := make([]int, 26)
	for index := range s {
		quotas[s[index]-'a']++
	}
	for index := range quotas {
		quotas[index] /= k
	}

	isRepeated := func(candidate string) bool {
		matched, completed := 0, 0
		for index := range s {
			if s[index] == candidate[matched] {
				matched++
				if matched == len(candidate) {
					completed++
					if completed == k {
						return true
					}
					matched = 0
				}
			}
		}
		return false
	}

	best := ""
	var search func(string)
	search = func(candidate string) {
		if len(candidate) > len(best) || len(candidate) == len(best) && candidate > best {
			best = candidate
		}
		for index := 25; index >= 0; index-- {
			if quotas[index] == 0 {
				continue
			}
			quotas[index]--
			extended := candidate + string(rune('a'+index))
			if isRepeated(extended) {
				search(extended)
			}
			quotas[index]++
		}
	}

	search("")
	return best
}
