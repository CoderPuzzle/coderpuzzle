// Removing scattered characters only charges their two extreme indices,
// so any optimal selection widens to one contiguous block [i, j):
// padding it never raises the score, and dropping more kept characters
// can only help the subsequence check. Greedy walks pin how far each
// flank reaches into s. pre[i] is the earliest end in s of a match of
// t[:i] (-1 marks the empty prefix) and stays finite up to L; suf[j] is
// the latest start of a backward match of t[j:] and stays finite from
// firstSuf. The block works iff pre[i] < suf[j]; pre rises with i and
// the smallest feasible j rises with it, so one forward pointer prices
// every split. Edge windows (drop whole tail/head/all) are the
// candidates j = m and i = 0 and fall out of the same sentinels.
func minimumScore(s string, t string) int {
	n := len(s)
	m := len(t)
	pre := make([]int, m+1)
	for i := range pre {
		pre[i] = -1
	}
	j := 0
	longestPre := 0
	for i := 1; i <= m; i++ {
		for j < n && s[j] != t[i-1] {
			j++
		}
		if j == n {
			break
		}
		pre[i] = j
		j++
		longestPre = i
	}
	if longestPre == m {
		return 0
	}
	suf := make([]int, m+1)
	j = n - 1
	firstSuf := m
	for k := m - 1; k >= 0; k-- {
		for j >= 0 && s[j] != t[k] {
			j--
		}
		if j < 0 {
			break
		}
		suf[k] = j
		j--
		firstSuf = k
	}
	ans := m - longestPre
	if firstSuf < ans {
		ans = firstSuf
	}
	p := 1
	for i := 0; i <= longestPre; i++ {
		if p < i+1 {
			p = i + 1
		}
		if p < firstSuf {
			p = firstSuf
		}
		for p < m && suf[p] <= pre[i] {
			p++
		}
		if p < m && p-i < ans {
			ans = p - i
		}
	}
	return ans
}
