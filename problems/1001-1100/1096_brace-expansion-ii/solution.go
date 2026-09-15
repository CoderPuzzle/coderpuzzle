import "sort"

func braceExpansionII(expression string) []string {
	// Iterative stack machine. cur holds the words of the concatenation so
	// far; a '{' pushes it as a saved prefix and starts a group whose
	// comma-separated alternatives accumulate in a union slot (an empty
	// map marks "no alternatives yet"); a '}' closes the group and
	// concatenates its union onto the saved prefix.
	stack := []map[string]bool{}
	cur := map[string]bool{"": true}
	for _, r := range expression {
		c := string(r)
		if c == "{" {
			stack = append(stack, cur)
			stack = append(stack, map[string]bool{}) // group union slot
			cur = map[string]bool{"": true}
		} else if c == "," {
			slot := stack[len(stack)-1]
			if len(slot) == 0 {
				stack[len(stack)-1] = cur
			} else {
				for w := range cur {
					slot[w] = true
				}
			}
			cur = map[string]bool{"": true}
		} else if c == "}" {
			group := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			if len(group) == 0 {
				group = cur
			} else {
				for w := range cur {
					group[w] = true
				}
			}
			prev := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			next := map[string]bool{}
			for a := range prev {
				for b := range group {
					next[a+b] = true
				}
			}
			cur = next
		} else {
			next := map[string]bool{}
			for w := range cur {
				next[w+c] = true
			}
			cur = next
		}
	}
	result := make([]string, 0, len(cur))
	for w := range cur {
		result = append(result, w)
	}
	sort.Strings(result)
	return result
}
