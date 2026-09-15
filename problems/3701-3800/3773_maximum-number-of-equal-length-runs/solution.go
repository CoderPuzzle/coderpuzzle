// One scan cuts s into maximal equal-letter runs; the answer is the largest
// number of runs that share a single length.
func maxSameLengthRuns(s string) int {
	counts := map[int]int{}
	n := len(s)
	i := 0
	for i < n {
		j := i
		for j < n && s[j] == s[i] {
			j++
		}
		counts[j-i]++
		i = j
	}
	best := 0
	for _, count := range counts {
		if count > best {
			best = count
		}
	}
	return best
}
