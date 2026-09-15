import "sort"

func removeInvalidParentheses(s string) []string {
	isValid := func(str string) bool {
		// Balance scan: fail as soon as a ')' has no '(' to match,
		// and require the counter to end back at zero.
		count := 0
		for _, ch := range str {
			if ch == '(' {
				count++
			} else if ch == ')' {
				count--
				if count < 0 {
					return false
				}
			}
		}
		return count == 0
	}
	// BFS over removal counts: every string in a level has had the
	// same number of characters deleted, so the first level holding
	// any valid string is exactly the minimum-removal answer.
	level := map[string]bool{s: true}
	for {
		valid := []string{}
		for item := range level {
			if isValid(item) {
				valid = append(valid, item)
			}
		}
		if len(valid) > 0 {
			// Sorted for deterministic output.
			sort.Strings(valid)
			return valid
		}
		// Expand one more deletion; only parentheses are removed and
		// the set dedups deletions that produce the same string.
		next := map[string]bool{}
		for item := range level {
			for i := 0; i < len(item); i++ {
				ch := item[i]
				if ch == '(' || ch == ')' {
					next[item[:i]+item[i+1:]] = true
				}
			}
		}
		level = next
	}
}
