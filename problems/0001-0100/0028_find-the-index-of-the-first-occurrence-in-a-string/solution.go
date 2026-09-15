// The empty needle occurs at every index by convention; the first is 0.
//
// lps[i] is the length of the longest proper prefix of needle[:i+1] that is
// also a suffix of it — how much of a partial match survives a mismatch. The
// scan keeps k, the needle characters currently matched ending at haystack[i];
// on mismatch k falls back to the longest needle prefix that is still a suffix
// of the matched window, not to zero, so the haystack is never re-examined.
func strStr(haystack string, needle string) int {
	if len(needle) == 0 {
		return 0
	}
	m := len(needle)
	lps := make([]int, m)
	k := 0
	for i := 1; i < m; i++ {
		for k > 0 && needle[i] != needle[k] {
			k = lps[k-1]
		}
		if needle[i] == needle[k] {
			k++
		}
		lps[i] = k
	}
	k = 0
	for i := 0; i < len(haystack); i++ {
		ch := haystack[i]
		for k > 0 && ch != needle[k] {
			k = lps[k-1]
		}
		if ch == needle[k] {
			k++
		}
		if k == m {
			return i - m + 1
		}
	}
	return -1
}
