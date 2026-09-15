// Every character occurs exactly once in each string, so its share of
// the sum is fixed by the two positions alone: one pass records where
// each letter sits in s, and one pass over t reduces every term to a
// lookup plus an absolute difference.
func findPermutationDifference(s string, t string) int {
	var pos [26]int
	for i := 0; i < len(s); i++ {
		pos[s[i]-'a'] = i
	}
	total := 0
	for i := 0; i < len(t); i++ {
		d := i - pos[t[i]-'a']
		if d < 0 {
			d = -d
		}
		total += d
	}
	return total
}
