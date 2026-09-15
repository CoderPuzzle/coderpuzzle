// Count windows with all five vowels and >= c consonants, for c = k and
// c = k + 1; their difference is the number with exactly k consonants. For
// each left end l, grow r until the window first qualifies; that minimal
// right end never moves backwards, so every character enters and leaves the
// window once — linear overall. The answer reaches ~n^2/2 = 2e10, so it is
// accumulated in an int64.
func vowelIndex(c byte) int {
	switch c {
	case 'a':
		return 0
	case 'e':
		return 1
	case 'i':
		return 2
	case 'o':
		return 3
	case 'u':
		return 4
	default:
		return -1
	}
}

func countOfSubstrings(word string, k int) int64 {
	atLeast := func(need int) int64 {
		n := len(word)
		var have [5]int
		distinct := 0
		cons := 0
		var total int64 = 0
		r := 0
		for l := 0; l < n; l++ {
			// Grow the window until it has every vowel and >= need consonants.
			for r < n && (distinct < 5 || cons < need) {
				v := vowelIndex(word[r])
				if v >= 0 {
					if have[v] == 0 {
						distinct++
					}
					have[v]++
				} else {
					cons++
				}
				r++
			}
			if distinct < 5 || cons < need {
				// No window starting at l (or any later l) can qualify.
				break
			}
			total += int64(n - (r - 1))
			// Drop word[l] before moving to the next left end.
			v := vowelIndex(word[l])
			if v >= 0 {
				have[v]--
				if have[v] == 0 {
					distinct--
				}
			} else {
				cons--
			}
		}
		return total
	}
	return atLeast(k) - atLeast(k+1)
}
