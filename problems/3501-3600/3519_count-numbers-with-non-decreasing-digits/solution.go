func countNumbers(l string, r string, b int) int {
	const MOD = 1000000007

	strip := func(s string) string {
		i := 0
		for i+1 < len(s) && s[i] == '0' {
			i++
		}
		return s[i:]
	}

	decStr := func(s string) (string, bool) {
		allZero := true
		for i := 0; i < len(s); i++ {
			if s[i] != '0' {
				allZero = false
				break
			}
		}
		if allZero {
			return "", false
		}
		c := []byte(s)
		i := len(c) - 1
		for i >= 0 {
			if c[i] > '0' {
				c[i]--
				break
			}
			c[i] = '9'
			i--
		}
		return strip(string(c)), true
	}

	toBase := func(s0 string) []int {
		s := strip(s0)
		var digits []int
		for s != "0" {
			carry := 0
			ns := make([]byte, 0, len(s))
			for i := 0; i < len(s); i++ {
				v := carry*10 + int(s[i]-'0')
				ns = append(ns, byte('0'+v/b))
				carry = v % b
			}
			digits = append(digits, carry)
			s = strip(string(ns))
		}
		if len(digits) == 0 {
			return []int{0}
		}
		out := make([]int, len(digits))
		for i, d := range digits {
			out[len(digits)-1-i] = d
		}
		return out
	}

	countUpTo := func(s string) int64 {
		digits := toBase(s)
		m := len(digits)
		// g[pos][last][tight][started]
		g := make([][][][2]int64, m+1)
		for pos := range g {
			g[pos] = make([][][2]int64, b)
			for last := range g[pos] {
				g[pos][last] = make([][2]int64, 2)
			}
		}
		for last := 0; last < b; last++ {
			for tight := 0; tight < 2; tight++ {
				for started := 0; started < 2; started++ {
					g[m][last][tight][started] = 1
				}
			}
		}
		for pos := m - 1; pos >= 0; pos-- {
			for last := 0; last < b; last++ {
				for tight := 0; tight < 2; tight++ {
					for started := 0; started < 2; started++ {
						limit := b - 1
						if tight == 1 {
							limit = digits[pos]
						}
						var res int64
						for d := 0; d <= limit; d++ {
							nt := 0
							if tight == 1 && d == limit {
								nt = 1
							}
							if started == 0 {
								if d == 0 {
									res += g[pos+1][0][nt][0]
								} else {
									res += g[pos+1][d][nt][1]
								}
							} else if d >= last {
								res += g[pos+1][d][nt][1]
							}
						}
						g[pos][last][tight][started] = res % MOD
					}
				}
			}
		}
		return g[0][0][1][0]
	}

	var below int64
	if d, ok := decStr(l); ok {
		below = countUpTo(d)
	}
	ans := ((countUpTo(r)-below)%MOD + MOD) % MOD
	return int(ans)
}
