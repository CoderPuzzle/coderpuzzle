func lexSmallestAfterDeletion(s string) string {
	// A letter occurring once can never be deleted, and any letter can be
	// deleted down to a single occurrence, so the reachable strings are
	// exactly the subsequences that keep every distinct letter. Build the
	// smallest one letter by letter: take the smallest letter whose
	// earliest remaining occurrence still leaves every not-yet-taken
	// letter an occurrence after it.
	n := len(s)
	pos := make([][]int, 26)
	for i := 0; i < n; i++ {
		c := int(s[i] - 'a')
		pos[c] = append(pos[c], i)
	}
	todo := make([]int, 0, 26)
	for c := 0; c < 26; c++ {
		if len(pos[c]) > 0 {
			todo = append(todo, c)
		}
	}
	ptr := make([]int, 26)
	out := make([]byte, 0, n)
	p := -1
	for len(todo) > 0 {
		// Two smallest last-occurrence deadlines among needed letters.
		m1, m2, d1 := n, n, -1
		for _, c := range todo {
			lc := pos[c][len(pos[c])-1]
			if lc < m1 {
				m2, m1, d1 = m1, lc, c
			} else if lc < m2 {
				m2 = lc
			}
		}
		for c := 0; c < 26; c++ {
			lst := pos[c]
			j := ptr[c]
			for j < len(lst) && lst[j] <= p {
				j++
			}
			ptr[c] = j
			if j == len(lst) {
				continue
			}
			// Taking occurrence q must not strand a needed letter.
			q := lst[j]
			lim := m1
			if c == d1 {
				lim = m2
			}
			if q < lim {
				out = append(out, byte('a'+c))
				p = q
				for k, tc := range todo {
					if tc == c {
						todo = append(todo[:k], todo[k+1:]...)
						break
					}
				}
				break
			}
		}
	}
	return string(out)
}
