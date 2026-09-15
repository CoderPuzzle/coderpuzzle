import "sort"

// At 5*10^5 characters only run-length structure matters: group
// each character's run lengths, keep the top three, and take the
// best of the three ways to place three windows.
func maximumLength(s string) int {
	var runs [26][]int
	n := len(s)
	i := 0
	for i < n {
		j := i
		for j < n && s[j] == s[i] {
			j++
		}
		runs[s[i]-'a'] = append(runs[s[i]-'a'], j-i)
		i = j
	}
	best := -1
	for _, rs := range runs {
		if len(rs) == 0 {
			continue
		}
		sort.Sort(sort.Reverse(sort.IntSlice(rs)))
		f1 := rs[0]
		f2, f3 := 0, 0
		if len(rs) > 1 {
			f2 = rs[1]
		}
		if len(rs) > 2 {
			f3 = rs[2]
		}
		// three windows in one run / two + one / one in each;
		// a 0 candidate means this character never reaches three.
		cand := max(f1-2, min(f1-1, f2), f3)
		if cand >= 1 && cand > best {
			best = cand
		}
	}
	return best
}
