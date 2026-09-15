func minOperations(initial string, target string) int {
	// Characters that survive form a contiguous window of initial and a
	// contiguous window of target, i.e. a common substring; every other
	// character costs exactly one operation, so the answer is
	// m + n - 2 * (longest common substring).
	best := 0
	prev := make([]int, len(target)+1)
	for _, a := range []byte(initial) {
		cur := make([]int, len(target)+1)
		for j := 0; j < len(target); j++ {
			if a == target[j] {
				cur[j+1] = prev[j] + 1
				if cur[j+1] > best {
					best = cur[j+1]
				}
			}
		}
		prev = cur
	}
	return len(initial) + len(target) - 2*best
}
