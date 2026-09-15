// Each operation deletes two copies of one letter — the closest
// same-letter occurrences on either side of a pivot — so every letter's
// count keeps its parity while pairs keep coming off.
func minimumLength(s string) int {
	counts := [26]int{}
	for i := range s {
		counts[s[i]-'a']++
	}
	// A letter with three or more copies always has a usable pivot, so
	// it reduces to one copy when odd and two when even; letters below
	// three are already stuck there.
	total := 0
	for _, count := range counts {
		if count == 0 {
			continue
		}
		if count%2 == 1 {
			total += 1
		} else {
			total += 2
		}
	}
	return total
}
