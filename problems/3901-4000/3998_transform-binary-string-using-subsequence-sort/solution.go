func transformStr(s string, qs []string) []bool {
	total := 0
	for i := range s {
		if s[i] == '1' {
			total++
		}
	}
	out := make([]bool, len(qs))
	for z, q := range qs {
		fixed, wild := 0, 0
		for i := range q {
			if q[i] == '1' {
				fixed++
			}
			if q[i] == '?' {
				wild++
			}
		}
		need := total - fixed
		if need < 0 || need > wild {
			continue
		}
		one := make([]bool, len(q))
		for i := len(q) - 1; i >= 0 && need > 0; i-- {
			if q[i] == '?' {
				one[i] = true
				need--
			}
		}
		a, b := 0, 0
		out[z] = true
		for i := range q {
			if s[i] == '1' {
				a++
			}
			if q[i] == '1' || one[i] {
				b++
			}
			if b > a {
				out[z] = false
			}
		}
	}
	return out
}
