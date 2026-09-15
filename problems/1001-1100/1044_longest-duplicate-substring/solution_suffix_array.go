import "sort"

func longestDupSubstring(s string) string {
	n := len(s)
	// Rank of each suffix by its first character alone; ranks only need
	// relative order, so the letter's alphabet index serves.
	sa := make([]int, n)
	rank := make([]int, n)
	for i := 0; i < n; i++ {
		sa[i] = i
		rank[i] = int(s[i] - 'a')
	}

	// Doubling sort: after the pass with step k, ranks order prefixes of
	// length 2k, so ceil(log2 n) passes settle the whole suffix order. Each
	// pass sorts on one packed key: the current rank scaled past every
	// possible second component, plus the rank of the suffix k steps later,
	// with 0 standing in for "past the end" so a suffix that is a prefix of
	// a longer one ranks strictly below it.
	key := make([]int64, n)
	next := make([]int, n)
	for k := 1; k < n; k *= 2 {
		for i := 0; i < n; i++ {
			second := 0
			if i+k < n {
				second = rank[i+k] + 1
			}
			key[i] = int64(rank[i])*int64(n+27) + int64(second)
		}
		sort.Slice(sa, func(x, y int) bool { return key[sa[x]] < key[sa[y]] })
		next[sa[0]] = 0
		r := 0
		for p := 1; p < n; p++ {
			if key[sa[p]] != key[sa[p-1]] {
				r++
			}
			next[sa[p]] = r
		}
		rank, next = next, rank
		if r == n-1 {
			break // every suffix distinct — the order is already final
		}
	}

	// Kasai's scan: walk the text positions left to right, matching each
	// suffix against its predecessor in sorted order. Dropping a leading
	// character from both sides of a match shortens it by at most one, so a
	// single extending counter h that only ever retreats by one per step
	// settles every LCP within 2n character comparisons.
	posOf := make([]int, n)
	for p := 0; p < n; p++ {
		posOf[sa[p]] = p
	}
	bestLength := 0
	bestStart := 0
	h := 0
	for i := 0; i < n; i++ {
		if posOf[i] > 0 {
			j := sa[posOf[i]-1]
			for i+h < n && j+h < n && s[i+h] == s[j+h] {
				h++
			}
			if h > bestLength {
				bestLength = h
				bestStart = i
			}
			if h > 0 {
				h--
			}
		} else {
			h = 0
		}
	}

	if bestLength == 0 {
		return ""
	}
	return s[bestStart : bestStart+bestLength]
}
