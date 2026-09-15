func smallestSubsequence(s string, k int, letter string, repetition int) string {
	n := len(s)
	target := letter[0]
	// suffix[i] = number of `letter` occurrences in s[i:]
	suffix := make([]int, n+1)
	for i := n - 1; i >= 0; i-- {
		add := 0
		if s[i] == target {
			add = 1
		}
		suffix[i] = suffix[i+1] + add
	}

	stack := make([]byte, 0, n)
	used := 0 // number of `letter` currently in the stack
	for i := 0; i < n; i++ {
		ch := s[i]
		for len(stack) > 0 {
			top := stack[len(stack)-1]
			if top <= ch {
				break
			}
			if len(stack)-1+(n-i) < k {
				break
			}
			lettersAfterPop := used
			if top == target {
				lettersAfterPop--
			}
			if ch == target {
				lettersAfterPop++
			}
			if lettersAfterPop+suffix[i+1] < repetition {
				break
			}
			stack = stack[:len(stack)-1]
			if top == target {
				used--
			}
		}
		stack = append(stack, ch)
		if ch == target {
			used++
		}
	}

	// Trim to exactly length k from the right, never dropping below
	// `repetition` target letters.
	remove := len(stack) - k
	lettersInStack := used
	res := make([]byte, 0, k)
	for p := len(stack) - 1; p >= 0; p-- {
		ch := stack[p]
		if remove == 0 {
			res = append(res, ch)
		} else if ch == target {
			if lettersInStack-1 >= repetition {
				lettersInStack--
				remove--
			} else {
				res = append(res, ch)
			}
		} else {
			remove--
		}
	}
	for i, j := 0, len(res)-1; i < j; i, j = i+1, j-1 {
		res[i], res[j] = res[j], res[i]
	}
	return string(res)
}
