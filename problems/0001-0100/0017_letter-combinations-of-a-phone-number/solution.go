// 2..9 map to consecutive group slots; 1 and 0 have no letters.
var groups = [...]string{"abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"}

func letterCombinations(digits string) []string {
	// Zero digits means zero combinations: [] (not [""]), and the walk below
	// must never start on an empty tree. Non-nil so it serializes as [].
	if digits == "" {
		return []string{}
	}
	combinations := []string{}
	current := make([]byte, 0, len(digits))
	var walk func(position int)
	walk = func(position int) {
		// A leaf is a complete root-to-leaf path: one letter per digit.
		if position == len(digits) {
			combinations = append(combinations, string(current))
			return
		}
		group := groups[digits[position]-'2']
		// Visit letters in group order so earlier digits vary slowest.
		for i := 0; i < len(group); i++ {
			current = append(current, group[i])
			walk(position + 1)
			current = current[:len(current)-1]
		}
	}
	walk(0)
	return combinations
}
