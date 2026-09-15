import "strconv"

func countPairs(nums []int) int {
	// Splitting the two operations between the numbers never helps: the
	// minimum number of digit swaps turning one padded string into
	// another obeys the triangle inequality, so x and y are almost equal
	// exactly when y is reachable from x by <= 2 swaps of x's own
	// digits, compared with leading zeros padded to the longer length
	// (that is how 1023 becomes 0213 = 213 and 1 meets 100).
	//
	// Pad every number to the widest width w (<= 7), enumerate all
	// values reachable by 0, 1, or 2 swaps (at most 1 + C(w,2) +
	// C(w,2)^2 deduplicated states), and sweep left to right: add the
	// frequencies of already-seen numbers found in the reachable set,
	// then record the current number. Each pair is counted once, via
	// the later element querying the earlier one's actual value.
	widest := 0
	for _, x := range nums {
		if x > widest {
			widest = x
		}
	}
	w := len(strconv.Itoa(widest))
	type pair struct{ i, j int }
	pairs := make([]pair, 0, w*(w-1)/2)
	for i := 0; i < w; i++ {
		for j := i + 1; j < w; j++ {
			pairs = append(pairs, pair{i, j})
		}
	}
	seen := make(map[int]int)
	ans := 0
	for _, x := range nums {
		s := strconv.Itoa(x)
		d := make([]byte, w)
		for k := range d {
			d[k] = '0'
		}
		for k := 0; k < len(s); k++ {
			d[w-len(s)+k] = s[k]
		}
		value := func() int {
			v := 0
			for _, c := range d {
				v = v*10 + int(c-'0')
			}
			return v
		}
		states := make(map[int]bool)
		states[value()] = true
		for _, p := range pairs {
			d[p.i], d[p.j] = d[p.j], d[p.i]
			states[value()] = true
			for _, q := range pairs {
				d[q.i], d[q.j] = d[q.j], d[q.i]
				states[value()] = true
				d[q.i], d[q.j] = d[q.j], d[q.i]
			}
			d[p.i], d[p.j] = d[p.j], d[p.i]
		}
		for v := range states {
			if c, ok := seen[v]; ok {
				ans += c
			}
		}
		seen[x]++
	}
	return ans
}
