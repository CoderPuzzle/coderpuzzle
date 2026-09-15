// A swap moves exactly two letters, so it changes two positions of s or,
// when the letters are equal, nothing at all. Count the positions where s
// and goal disagree: exactly two that cross, or none with a repeated
// letter to trade.
func buddyStrings(s string, goal string) bool {
	if len(s) != len(goal) {
		return false
	}
	first, second := -1, -1
	for i := 0; i < len(s); i++ {
		if s[i] != goal[i] {
			if first == -1 {
				first = i
			} else if second == -1 {
				second = i
			} else {
				return false
			}
		}
	}
	if second != -1 {
		return s[first] == goal[second] && s[second] == goal[first]
	}
	if first != -1 {
		return false
	}
	var seen [26]bool
	for i := 0; i < len(s); i++ {
		k := s[i] - 'a'
		if seen[k] {
			return true
		}
		seen[k] = true
	}
	return false
}
