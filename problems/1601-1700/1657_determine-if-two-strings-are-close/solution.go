import "sort"

// Neither operation creates or destroys a letter: Operation 1 only
// rearranges characters, and Operation 2 swaps the totals of two existing
// letters. Two strings are therefore close exactly when they occur over the
// same letter set with the same multiset of frequencies — tallied into
// 26-slot count arrays, presence compared slot by slot, then both arrays
// sorted and compared as lists.
func closeStrings(word1 string, word2 string) bool {
	var counts1, counts2 [26]int
	for _, c := range word1 {
		counts1[c-'a']++
	}
	for _, c := range word2 {
		counts2[c-'a']++
	}
	for i := range counts1 {
		if (counts1[i] > 0) != (counts2[i] > 0) {
			return false
		}
	}
	freqs1, freqs2 := counts1[:], counts2[:]
	sort.Ints(freqs1)
	sort.Ints(freqs2)
	for i := range freqs1 {
		if freqs1[i] != freqs2[i] {
			return false
		}
	}
	return true
}
