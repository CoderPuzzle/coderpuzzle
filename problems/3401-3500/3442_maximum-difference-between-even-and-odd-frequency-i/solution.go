// To maximize freq(a1) - freq(a2), take the largest odd frequency and the
// smallest even one; one counting pass decides both.
func maxDifference(s string) int {
	var freq [26]int
	for i := 0; i < len(s); i++ {
		freq[s[i]-'a']++
	}
	odd, even := -1, 101
	for _, f := range freq {
		if f == 0 {
			continue
		}
		if f&1 == 1 {
			odd = max(odd, f)
		} else {
			even = min(even, f)
		}
	}
	return odd - even
}
