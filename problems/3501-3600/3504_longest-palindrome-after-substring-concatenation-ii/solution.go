// p[i] = longest palindrome starting at s[i], q[j] = longest palindrome
// ending at t[j]; both come from a rolling interval table in O(n^2)/O(m^2)
// time and O(n)/O(m) space. dp[i][j] = longest palindrome starting with s[i]
// and ending with t[j]; each cell needs only dp[i+1][j-1], its neighbour on
// the diagonal i + j, so one scalar walks each diagonal inward.
func longestPalindrome(s string, t string) int {
	n, m := len(s), len(t)
	p := make([]int, n)
	for i := range p {
		p[i] = 1
	}
	below := make([]bool, n+1)
	for i := n - 1; i >= 0; i-- {
		row := make([]bool, n+1)
		row[i] = true
		best := 1
		for j := i + 1; j < n; j++ {
			row[j] = s[i] == s[j] && (j == i+1 || below[j-1])
			if row[j] {
				best = j - i + 1
			}
		}
		p[i] = best
		below = row
	}
	q := make([]int, m)
	for i := range q {
		q[i] = 1
	}
	below = make([]bool, m+1)
	for i := m - 1; i >= 0; i-- {
		row := make([]bool, m+1)
		row[i] = true
		for j := i + 1; j < m; j++ {
			row[j] = t[i] == t[j] && (j == i+1 || below[j-1])
			if row[j] {
				q[j] = j - i + 1
			}
		}
		below = row
	}
	best := 0
	for _, v := range p {
		if v > best {
			best = v
		}
	}
	for _, v := range q {
		if v > best {
			best = v
		}
	}
	for d := 0; d < n+m-1; d++ {
		iHi := d
		if d >= n {
			iHi = n - 1
		}
		iLo := d - m + 1
		if iLo < 0 {
			iLo = 0
		}
		jHi := d - iHi
		nxt := 0
		if iHi < n-1 {
			nxt = p[iHi+1]
		} else if jHi > 0 {
			nxt = q[jHi-1]
		}
		for i := iHi; i >= iLo; i-- {
			j := d - i
			cur := p[i]
			if q[j] > cur {
				cur = q[j]
			}
			if s[i] == t[j] {
				add := nxt + 2
				if add > cur {
					cur = add
				}
			}
			if cur > best {
				best = cur
			}
			nxt = cur
		}
	}
	return best
}
