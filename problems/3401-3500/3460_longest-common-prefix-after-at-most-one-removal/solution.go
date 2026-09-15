// Walk to the first mismatch (or whichever string ends first), then try
// the single deletion worth making: removing s[i]. An earlier removal
// shifts the alignment for no gain, a later one cannot repair the
// mismatch at i; either string ending degenerates cleanly.
func longestCommonPrefix(s string, t string) int {
	n, m := len(s), len(t)
	i := 0
	for i < n && i < m && s[i] == t[i] {
		i++
	}
	j, k := i+1, i
	for j < n && k < m && s[j] == t[k] {
		j++
		k++
	}
	return k
}
