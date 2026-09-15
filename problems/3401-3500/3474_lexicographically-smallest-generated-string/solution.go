// 'T' windows pin their characters outright: stamp str2 into each one,
// refusing the instance when two stamps disagree. Free positions then take
// 'a', and 'F' windows that accidentally equal str2 are repaired by bumping
// their rightmost free slot to 'b'.
func generateString(str1 string, str2 string) string {
	n, m := len(str1), len(str2)
	total := n + m - 1
	word := make([]byte, total) // 0 marks "not yet stamped"
	covered := make([]bool, total)
	for i := 0; i < n; i++ {
		if str1[i] == 'T' {
			for j := 0; j < m; j++ {
				p := i + j
				if word[p] != 0 && word[p] != str2[j] {
					return ""
				}
				word[p] = str2[j]
				covered[p] = true
			}
		}
	}
	// Every other position takes 'a', the smallest character available.
	for p := range word {
		if word[p] == 0 {
			word[p] = 'a'
		}
	}
	// Repair left to right: bumping the rightmost free slot from 'a' to
	// 'b' is the smallest change that late in the string.
	for i := 0; i < n; i++ {
		if str1[i] == 'F' && string(word[i:i+m]) == str2 {
			j := i + m - 1
			for j >= i && covered[j] {
				j--
			}
			if j < i {
				return "" // fully pinned window that still matches
			}
			word[j] = 'b'
		}
	}
	return string(word)
}
