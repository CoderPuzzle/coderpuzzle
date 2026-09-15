import "sort"

// Filter to the coupons that are active, carry an allowed category and a
// non-empty alphanumeric/underscore code, then order the survivors by
// (category rank, code) — the code tiebreak is plain lexicographic order.
func validateCoupons(code []string, businessLine []string, isActive []bool) []string {
	// Category rank: electronics < grocery < pharmacy < restaurant.
	rank := map[string]int{"electronics": 0, "grocery": 1, "pharmacy": 2, "restaurant": 3}
	valid := make([][2]string, 0, len(code))
	for i, name := range code {
		if !isActive[i] {
			continue
		}
		if _, ok := rank[businessLine[i]]; !ok {
			continue
		}
		if !codeOk(name) {
			continue
		}
		valid = append(valid, [2]string{businessLine[i], name})
	}
	sort.Slice(valid, func(i, j int) bool {
		if rank[valid[i][0]] != rank[valid[j][0]] {
			return rank[valid[i][0]] < rank[valid[j][0]]
		}
		return valid[i][1] < valid[j][1]
	})
	answer := make([]string, len(valid))
	for i := range valid {
		answer[i] = valid[i][1]
	}
	return answer
}

// codeOk reports whether name is non-empty and every character is an ASCII
// letter, digit, or underscore.
func codeOk(name string) bool {
	if len(name) == 0 {
		return false
	}
	for i := 0; i < len(name); i++ {
		c := name[i]
		alnum := ('a' <= c && c <= 'z') || ('A' <= c && c <= 'Z') || ('0' <= c && c <= '9')
		if !alnum && c != '_' {
			return false
		}
	}
	return true
}
