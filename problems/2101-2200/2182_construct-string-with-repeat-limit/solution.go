// Greedy: always emit the largest letter still available; when it
// exhausts its allowed run, spend one unit of the next largest as a
// separator, then resume.
func repeatLimitedString(s string, repeatLimit int) string {
	counts := [26]int{}
	for _, ch := range s {
		counts[ch-'a']++
	}
	out := make([]byte, 0, len(s))
	i := 25
	for {
		for i >= 0 && counts[i] == 0 {
			i--
		}
		if i < 0 {
			break
		}
		run := repeatLimit
		if counts[i] < run {
			run = counts[i]
		}
		for k := 0; k < run; k++ {
			out = append(out, byte('a'+i))
		}
		counts[i] -= run
		if counts[i] == 0 {
			continue
		}
		j := i - 1
		for j >= 0 && counts[j] == 0 {
			j--
		}
		if j < 0 {
			break
		}
		out = append(out, byte('a'+j))
		counts[j]--
	}
	return string(out)
}
