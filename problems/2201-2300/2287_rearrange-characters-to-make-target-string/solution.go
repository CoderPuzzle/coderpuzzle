func rearrangeCharacters(s string, target string) int {
	var have [26]int
	var need [26]int
	for _, ch := range []byte(s) {
		have[ch-'a']++
	}
	for _, ch := range []byte(target) {
		need[ch-'a']++
	}
	answer := 100
	for ch := 0; ch < 26; ch++ {
		if need[ch] > 0 && have[ch]/need[ch] < answer {
			answer = have[ch] / need[ch]
		}
	}
	return answer
}
