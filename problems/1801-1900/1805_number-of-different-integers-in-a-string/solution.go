// A digit run can be up to 1000 digits long, far beyond any fixed-width
// integer, so runs are never parsed: each is stripped of leading zeros and
// compared as a string in a hash set. The strip loop keeps one digit, so an
// all-zero run stays "0".
func numDifferentIntegers(word string) int {
	seen := map[string]bool{}
	n := len(word)
	i := 0
	for i < n {
		c := word[i]
		if c < '0' || c > '9' {
			i++
			continue
		}
		j := i
		for j < n && word[j] >= '0' && word[j] <= '9' {
			j++
		}
		k := i
		for k+1 < j && word[k] == '0' {
			k++
		}
		seen[word[k:j]] = true
		i = j
	}
	return len(seen)
}
