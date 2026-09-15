func findAnagrams(s string, p string) []int {
	length := len(p)
	n := len(s)
	result := []int{}
	if n < length {
		return result
	}
	var delta [128]int
	for i := 0; i < length; i++ {
		delta[p[i]]++
	}
	diff := 0
	for _, d := range delta {
		if d != 0 {
			diff++
		}
	}
	for i := 0; i < n; i++ {
		c := s[i]
		if delta[c] == 0 {
			diff++
		}
		delta[c]--
		if delta[c] == 0 {
			diff--
		}
		if i >= length {
			out := s[i-length]
			if delta[out] == 0 {
				diff++
			}
			delta[out]++
			if delta[out] == 0 {
				diff--
			}
		}
		if i >= length-1 && diff == 0 {
			result = append(result, i-length+1)
		}
	}
	return result
}
