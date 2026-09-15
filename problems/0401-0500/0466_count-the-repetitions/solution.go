// Walk str1 one s1-block at a time. The only state crossing a block boundary
// is the cursor into s2 plus the copies consumed so far, and the cursor alone
// decides how any later block plays out — so a repeated cursor exposes a
// cycle that can be jumped arithmetically.
func getMaxRepetitions(s1 string, n1 int, s2 string, n2 int) int {
	type state struct{ blocks, copies int }
	seen := make(map[int]state)
	cursor, copies, blocks := 0, 0, 0
	for blocks < n1 {
		for i := 0; i < len(s1); i++ {
			if s1[i] == s2[cursor] {
				cursor++
				if cursor == len(s2) {
					cursor = 0
					copies++
				}
			}
		}
		blocks++
		if start, ok := seen[cursor]; ok {
			// Every cycle of blocks adds a fixed number of copies; take as
			// many whole cycles as fit, then walk the leftovers by hand.
			jumps := (n1 - blocks) / (blocks - start.blocks)
			copies += jumps * (copies - start.copies)
			blocks += jumps * (blocks - start.blocks)
			seen = make(map[int]state)
		} else {
			seen[cursor] = state{blocks, copies}
		}
	}
	return copies / n2
}
