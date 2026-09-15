func validSubstringCount(word1 string, word2 string) int64 {
	// need[c] is how many copies of c a valid window must contain, and
	// missing counts the distinct letters whose quota is not yet met.
	var need [26]int
	for _, ch := range word2 {
		need[ch-'a']++
	}
	missing := 0
	for c := 0; c < 26; c++ {
		if need[c] > 0 {
			missing++
		}
	}
	var window [26]int
	var total int64 = 0
	left := 0
	n := len(word1)
	for right := 0; right < n; right++ {
		ci := word1[right] - 'a'
		window[ci]++
		if window[ci] == need[ci] {
			missing--
		}
		if missing == 0 {
			// Shrink while the left character is not load-bearing: its
			// removal leaves every quota intact. When this stops,
			// [left..right] is the minimal covering window ending at
			// right, so starts 0..left all yield valid substrings.
			for window[word1[left]-'a']-1 >= need[word1[left]-'a'] {
				window[word1[left]-'a']--
				left++
			}
			total += int64(left + 1)
		}
	}
	return total
}
