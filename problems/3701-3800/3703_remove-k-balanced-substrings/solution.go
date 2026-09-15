func removeSubstring(s string, k int) string {
	type run struct {
		ch    byte
		count int
	}
	// Run-length stack: each entry is one maximal run, char plus count.
	stack := make([]run, 0, len(s))
	for i := 0; i < len(s); i++ {
		ch := s[i]
		if n := len(stack); n > 0 && stack[n-1].ch == ch {
			stack[n-1].count++
		} else {
			stack = append(stack, run{ch: ch, count: 1})
		}
		// A ')' run sitting on a '(' run is a live junction: cancel
		// min(open / k, close / k) whole blocks of k from both sides.
		for len(stack) > 1 && stack[len(stack)-1].ch == ')' &&
			stack[len(stack)-2].ch == '(' {
			blocks := stack[len(stack)-2].count / k
			if c := stack[len(stack)-1].count / k; c < blocks {
				blocks = c
			}
			if blocks == 0 {
				break
			}
			closeRun := stack[len(stack)-1]
			below := stack[len(stack)-2]
			stack = stack[:len(stack)-2]
			below.count -= blocks * k
			closeRun.count -= blocks * k
			// Survivors go back on top, merging equal-char neighbours; a
			// merge can expose another junction one level down.
			for _, r := range [2]run{below, closeRun} {
				if r.count > 0 {
					if n := len(stack); n > 0 && stack[n-1].ch == r.ch {
						stack[n-1].count += r.count
					} else {
						stack = append(stack, r)
					}
				}
			}
		}
	}
	// The surviving runs are the irreducible string.
	result := make([]byte, 0, len(s))
	for _, r := range stack {
		for j := 0; j < r.count; j++ {
			result = append(result, r.ch)
		}
	}
	return string(result)
}
