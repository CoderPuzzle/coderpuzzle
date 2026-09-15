func minimumGroups(words []string) int {
	q := map[string]bool{}
	for _, w := range words {
		a := make([]byte, 0, (len(w)+1)/2)
		b := make([]byte, 0, len(w)/2)
		for i := range w {
			if i%2 == 0 {
				a = append(a, w[i])
			} else {
				b = append(b, w[i])
			}
		}
		canon := func(s string) string {
			if len(s) == 0 {
				return s
			}
			z := s + s
			n, i, j, k := len(s), 0, 1, 0
			for i < n && j < n && k < n {
				if z[i+k] == z[j+k] {
					k++
					continue
				}
				if z[i+k] > z[j+k] {
					i = i + k + 1
					if i == j {
						i++
					}
				} else {
					j = j + k + 1
					if i == j {
						j++
					}
				}
				k = 0
			}
			p := i
			if j < p {
				p = j
			}
			return z[p : p+n]
		}
		q[canon(string(a))+"#"+canon(string(b))] = true
	}
	return len(q)
}
