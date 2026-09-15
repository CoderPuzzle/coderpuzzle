func maxUniqueSplit(s string) int {
	n := len(s)
	used := make(map[string]bool)
	best := 0
	var walk func(start, count int)
	walk = func(start, count int) {
		if start == n {
			if count > best {
				best = count
			}
			return
		}
		// count so far plus the (n - start) characters still left, each
		// contributing at most one more piece: a bound on what this
		// branch could still reach, cheap to check before it is explored.
		if count+(n-start) <= best {
			return
		}
		for end := start + 1; end <= n; end++ {
			piece := s[start:end]
			if used[piece] {
				continue
			}
			used[piece] = true
			walk(end, count+1)
			// Undo so the next candidate length starts from the same
			// used-substring state as this one did.
			delete(used, piece)
		}
	}
	walk(0, 0)
	return best
}
