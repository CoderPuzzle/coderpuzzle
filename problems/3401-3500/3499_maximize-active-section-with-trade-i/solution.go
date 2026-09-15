// Augment with '1' at both ends, then run-length encode the result. A trade
// turns an internal '1'-run (one '0'-run on each side) plus both flanking
// '0'-runs into '1's, gaining their combined length.
func maxActiveSectionsAfterTrade(s string) int {
	t := "1" + s + "1"
	total := 0
	for i := 0; i < len(s); i++ {
		total += int(s[i] - '0')
	}
	runs := []int{}
	i := 0
	for i < len(t) {
		j := i
		for j < len(t) && t[j] == t[i] {
			j++
		}
		runs = append(runs, j-i)
		i = j
	}
	// Runs alternate starting with '1', so the internal '1'-runs sit at even
	// indices 2, 4, ..., len(runs)-3 with a '0'-run on each side.
	best := 0
	for k := 2; k < len(runs)-2; k += 2 {
		if sum := runs[k-1] + runs[k+1]; sum > best {
			best = sum
		}
	}
	return total + best
}
