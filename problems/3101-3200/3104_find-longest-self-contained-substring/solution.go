import "math"

func maxSubstringLength(s string) int {
	n := len(s)
	first := [26]int{}
	last := [26]int{}
	for d := range first {
		first[d] = -1
	}
	// Prefix counts make "does letter d occur inside s[l..r]" a plain
	// count difference, driving both the closure cascade and the final
	// validation.
	counts := make([][26]int, n+1)
	for i := 0; i < n; i++ {
		counts[i+1] = counts[i]
		d := s[i] - 'a'
		counts[i+1][d]++
		if first[d] == -1 {
			first[d] = i
		}
		last[d] = i
	}

	// A self-contained window always starts at the first occurrence of
	// its own leading character, so only those positions are anchors.
	best := -1
	for c := 0; c < 26; c++ {
		if first[c] == -1 {
			continue
		}
		l := first[c]
		r := last[s[l]-'a']
		for {
			// Stabilize: extend the right end until every letter
			// occurring inside s[l..r] is fully contained there,
			// tracking the earliest first occurrence among them.
			minFirst := math.MaxInt32
			for {
				newR := r
				minFirst = math.MaxInt32
				for d := 0; d < 26; d++ {
					if counts[r+1][d]-counts[l][d] > 0 {
						if last[d] > newR {
							newR = last[d]
						}
						if first[d] < minFirst {
							minFirst = first[d]
						}
					}
				}
				if newR == r {
					break
				}
				r = newR
			}
			if minFirst >= l && !(l == 0 && r == n-1) {
				if r-l+1 > best {
					best = r - l + 1
				}
			}
			if r == n-1 {
				break
			}
			// Absorb the next closed block wholesale; unions of
			// consecutive blocks surface as further fixpoints.
			r = last[s[r+1]-'a']
		}
	}
	return best
}
