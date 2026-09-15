// A password is priced by three counts: how many of the three character
// classes are missing, how many replaces the runs of length >= 3 need, and —
// over length 20 — where the mandatory deletions retire the most replaces.
func strongPasswordChecker(password string) int {
	n := len(password)
	hasLower, hasUpper, hasDigit := false, false, false
	for i := 0; i < n; i++ {
		c := password[i]
		if c >= 'a' && c <= 'z' {
			hasLower = true
		} else if c >= 'A' && c <= 'Z' {
			hasUpper = true
		} else if c >= '0' && c <= '9' {
			hasDigit = true
		}
	}
	missing := 3
	if hasLower {
		missing--
	}
	if hasUpper {
		missing--
	}
	if hasDigit {
		missing--
	}
	// Every maximal run of length >= 3, e.g. "aaabbb" -> [3, 3].
	runs := []int{}
	i := 0
	for i < n {
		j := i
		for j < n && password[j] == password[i] {
			j++
		}
		if j-i >= 3 {
			runs = append(runs, j-i)
		}
		i = j
	}
	// Too short: the inserts that reach length 6 can also break the one
	// possible run and carry the missing classes.
	if n < 6 {
		return max(6-n, missing)
	}
	// A replace fixes a run slot and can double as a class fix, so the
	// mid regime is a max, not a sum.
	replace := 0
	for _, length := range runs {
		replace += length / 3
	}
	if n <= 20 {
		return max(missing, replace)
	}
	// Too long: n - 20 deletions are unavoidable. A deletion retires a
	// replace only when it pushes a run below a multiple of 3, so the
	// budget goes to runs sitting on a multiple first (1 deletion), then
	// remainder 1 (2 deletions), then remainder 2 (3 deletions).
	delete := n - 20
	for remainder := 0; remainder < 3; remainder++ {
		for _, length := range runs {
			if length%3 != remainder {
				continue
			}
			cost := remainder + 1
			if delete >= cost {
				delete -= cost
				replace--
			}
		}
	}
	replace = max(replace-delete/3, 0)
	return (n - 20) + max(missing, replace)
}
