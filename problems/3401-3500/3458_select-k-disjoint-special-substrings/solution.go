import "sort"

// Every special substring starts at the first occurrence of its first
// letter — any earlier repeat would sit outside it — so at most 26
// candidate starts exist. Grow each window right until it covers every
// occurrence of every character inside it, then run classic activity
// selection over the surviving intervals.
func maxSubstringLength(s string, k int) bool {
	n := len(s)
	var first, last [26]int
	for c := range first {
		first[c] = -1
	}
	for i := 0; i < n; i++ {
		c := int(s[i] - 'a')
		if first[c] == -1 {
			first[c] = i
		}
		last[c] = i
	}
	type interval struct{ a, b int }
	var intervals []interval
	for c := 0; c < 26; c++ {
		if first[c] == -1 {
			continue
		}
		a, far := first[c], last[c]
		ok := true
		// A character leaking left of the start invalidates it entirely;
		// the whole string itself is not a valid selection either.
		for j := a; j <= far; j++ {
			x := int(s[j] - 'a')
			if first[x] < a {
				ok = false
				break
			}
			if last[x] > far {
				far = last[x]
			}
		}
		if ok && (a > 0 || far < n-1) {
			intervals = append(intervals, interval{a, far})
		}
	}
	// Taking earliest ends leaves the most room for further disjoint picks.
	sort.Slice(intervals, func(i, j int) bool { return intervals[i].b < intervals[j].b })
	count, end := 0, -1
	for _, iv := range intervals {
		if iv.a > end {
			count++
			end = iv.b
		}
	}
	return count >= k
}
