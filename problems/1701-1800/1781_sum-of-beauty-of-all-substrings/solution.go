// For each start, grow the substring one character at a time and read
// every prefix's beauty straight off a running count array: max
// frequency minus min nonzero frequency.
func beautySum(s string) int {
	total := 0
	n := len(s)
	for i := 0; i < n; i++ {
		counts := [26]int{}
		for j := i; j < n; j++ {
			counts[s[j]-'a']++
			best := 0
			least := n
			for _, c := range counts {
				if c > best {
					best = c
				}
				if c > 0 && c < least {
					least = c
				}
			}
			total += best - least
		}
	}
	return total
}
