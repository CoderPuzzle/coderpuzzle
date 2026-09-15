// Equivalently: keep the longest middle stretch whose letter counts stay at
// or under total - k; the ends taken to delete it are then k of each letter
// or more. Answer = n - that longest window.
func takeCharacters(s string, k int) int {
	n := len(s)
	var total [3]int
	for i := 0; i < n; i++ {
		total[s[i]-'a']++
	}
	if total[0] < k || total[1] < k || total[2] < k {
		return -1
	}
	var window [3]int
	left := 0
	best := 0
	for right := 0; right < n; right++ {
		window[s[right]-'a']++
		for window[0] > total[0]-k || window[1] > total[1]-k ||
			window[2] > total[2]-k {
			window[s[left]-'a']--
			left++
		}
		if d := right - left + 1; d > best {
			best = d
		}
	}
	return n - best
}
