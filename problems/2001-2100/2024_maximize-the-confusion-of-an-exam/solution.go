func maxConsecutiveAnswers(answerKey string, k int) int {
	// t/f count answers inside the window; a window can be made uniform by
	// flipping whichever character is currently the minority.
	t, f := 0, 0
	left := 0
	best := 0
	n := len(answerKey)
	for right := 0; right < n; right++ {
		if answerKey[right] == 'T' {
			t++
		} else {
			f++
		}
		// Shrink from the left while the minority count (m = min(t, f))
		// exceeds the k flips. The min covers both choices of final majority
		// at once, and monotone validity means left never moves backward.
		for {
			m := t
			if f < m {
				m = f
			}
			if m <= k {
				break
			}
			if answerKey[left] == 'T' {
				t--
			} else {
				f--
			}
			left++
		}
		if w := right - left + 1; w > best {
			best = w
		}
	}
	return best
}
