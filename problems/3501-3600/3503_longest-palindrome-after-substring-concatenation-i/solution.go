// palS[i][j] (palT[i][j]) records whether s[i..j] (t[i..j]) is a palindrome;
// the tables also give single-string answers, since either substring may be
// empty. Padding rows keep the below-row in bounds. Then enumerate every pair
// of non-empty substrings: the concatenation s[i..i2] + t[j..j2] is a
// palindrome iff the shorter side mirrors the longer one and the leftover
// piece is itself a palindrome.
func longestPalindrome(s string, t string) int {
	n, m := len(s), len(t)
	palS := make([][]bool, n+1)
	for i := range palS {
		palS[i] = make([]bool, n+1)
	}
	best := 0
	for i := n - 1; i >= 0; i-- {
		palS[i][i] = true
		for j := i + 1; j < n; j++ {
			palS[i][j] = s[i] == s[j] && (j == i+1 || palS[i+1][j-1])
		}
		for j := n - 1; j >= i; j-- {
			if palS[i][j] {
				if j-i+1 > best {
					best = j - i + 1
				}
				break
			}
		}
	}
	palT := make([][]bool, m+1)
	for i := range palT {
		palT[i] = make([]bool, m+1)
	}
	for i := m - 1; i >= 0; i-- {
		palT[i][i] = true
		for j := i + 1; j < m; j++ {
			palT[i][j] = t[i] == t[j] && (j == i+1 || palT[i+1][j-1])
		}
		for j := m - 1; j >= i; j-- {
			if palT[i][j] {
				if j-i+1 > best {
					best = j - i + 1
				}
				break
			}
		}
	}
	for i := 0; i < n; i++ {
		for i2 := i; i2 < n; i2++ {
			la := i2 - i + 1
			for j := 0; j < m; j++ {
				for j2 := j; j2 < m; j2++ {
					lb := j2 - j + 1
					if la+lb <= best {
						continue
					}
					limit := la
					if lb < la {
						limit = lb
					}
					ok := true
					for k := 0; k < limit; k++ {
						if s[i+k] != t[j2-k] {
							ok = false
							break
						}
					}
					if !ok {
						continue
					}
					if la == lb {
						best = la + lb
					} else if la > lb && palS[i+lb][i2] {
						best = la + lb
					} else if la < lb && palT[j][j2-la] {
						best = la + lb
					}
				}
			}
		}
	}
	return best
}
