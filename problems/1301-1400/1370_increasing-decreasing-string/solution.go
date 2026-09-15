func sortString(s string) string {
	counts := make([]int, 26)
	for _, ch := range s {
		counts[ch-'a']++
	}
	remaining := len(s)
	out := make([]byte, 0, len(s))
	forward := true
	for remaining > 0 {
		for k := 0; k < 26; k++ {
			i := k
			if !forward {
				i = 25 - k
			}
			if counts[i] > 0 {
				counts[i]--
				remaining--
				out = append(out, byte('a'+i))
			}
		}
		forward = !forward
	}
	return string(out)
}
