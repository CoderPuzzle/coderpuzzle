func minimumCost(s string) int64 {
	// A prefix flip ending at i-1 (cost i) toggles exactly the left side
	// of border i, and a suffix flip starting at i (cost n-i) toggles
	// exactly its right side; so whenever s[i-1] != s[i], one of the two
	// runs an odd number of times -- pay the cheaper. Borders touch no
	// shared operation, making each fix independent. The sum peaks at
	// n^2/4 ~= 2.5e9, hence the int64 accumulator.
	var n int64 = int64(len(s))
	var ans int64 = 0
	for i := int64(1); i < n; i++ {
		if s[i] != s[i-1] {
			left, right := i, n-i
			if right < left {
				left = right
			}
			ans += left
		}
	}
	return ans
}
