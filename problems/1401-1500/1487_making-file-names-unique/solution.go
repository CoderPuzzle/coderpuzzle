import "strconv"

func getFolderNames(names []string) []string {
	used := make(map[string]bool)
	nextK := make(map[string]int64)
	result := make([]string, 0, len(names))
	for _, name := range names {
		if !used[name] {
			used[name] = true
			if _, seen := nextK[name]; !seen {
				nextK[name] = 1
			}
			result = append(result, name)
			continue
		}
		base := name
		k := nextK[base]
		if k == 0 {
			k = 1
		}
		candidate := base + "(" + strconv.FormatInt(k, 10) + ")"
		for used[candidate] {
			k++
			candidate = base + "(" + strconv.FormatInt(k, 10) + ")"
		}
		used[candidate] = true
		nextK[base] = k + 1
		if idx := lastParen(candidate); idx > 0 && candidate[len(candidate)-1] == ')' && allDigits(candidate[idx+1:len(candidate)-1]) {
			stem := candidate[:idx]
			val := parseDigits(candidate[idx+1:len(candidate)-1]) + 1
			if cur := nextK[stem]; cur < val {
				nextK[stem] = val
			}
		}
		result = append(result, candidate)
	}
	return result
}

func lastParen(s string) int {
	for i := len(s) - 1; i >= 0; i-- {
		if s[i] == '(' {
			return i
		}
	}
	return -1
}

func allDigits(s string) bool {
	if len(s) == 0 {
		return false
	}
	for _, c := range s {
		if c < '0' || c > '9' {
			return false
		}
	}
	return true
}

func parseDigits(s string) int64 {
	var v int64
	for _, c := range s {
		v = v*10 + int64(c-'0')
	}
	return v
}
