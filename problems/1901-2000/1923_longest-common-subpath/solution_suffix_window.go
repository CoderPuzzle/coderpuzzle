import "sort"

func longestCommonSubpath(n int, paths [][]int) int {
	k := len(paths)
	// Every sequence is glued into one text, closed by its own separator.
	// Separators sit strictly above every value in the text and are
	// pairwise distinct, so a separator can never line up with a value — or
	// with another separator — and a match between suffixes of two
	// sequences stops exactly at the sequence ends instead of leaking
	// across a boundary. The first separator sits just past the largest
	// value in play: the statement bounds values below n, and the measured
	// maximum keeps even an out-of-bounds value from colliding.
	hi := -1
	for _, p := range paths {
		for _, v := range p {
			if v > hi {
				hi = v
			}
		}
	}
	base := n
	if hi+1 > base {
		base = hi + 1
	}
	total := k
	for _, p := range paths {
		total += len(p)
	}
	text := make([]int, total)
	owner := make([]int, total) // sequence index per position, -1 on separators
	at := 0
	for i, p := range paths {
		for _, v := range p {
			text[at] = v
			owner[at] = i
			at++
		}
		text[at] = base + i
		owner[at] = -1
		at++
	}

	// Rank of each suffix by its first symbol alone; ranks only need
	// relative order, so raw values serve.
	sa := make([]int, total)
	rank := make([]int, total)
	for i := 0; i < total; i++ {
		sa[i] = i
		rank[i] = text[i]
	}

	// Doubling sort: after the pass with step k, ranks order prefixes of
	// length 2k, so ceil(log2 total) passes settle the whole suffix order.
	// Each pass sorts on one packed key: the current rank scaled past every
	// possible second component, plus the rank of the suffix k steps later,
	// with 0 standing in for "past the end" so a suffix that is a prefix of
	// a longer one ranks strictly below it.
	key := make([]int64, total)
	next := make([]int, total)
	for step := 1; step < total; step *= 2 {
		for i := 0; i < total; i++ {
			second := 0
			if i+step < total {
				second = rank[i+step] + 1
			}
			key[i] = int64(rank[i])*int64(total+1) + int64(second)
		}
		sort.Slice(sa, func(x, y int) bool { return key[sa[x]] < key[sa[y]] })
		next[sa[0]] = 0
		classes := 0
		for p := 1; p < total; p++ {
			if key[sa[p]] != key[sa[p-1]] {
				classes++
			}
			next[sa[p]] = classes
		}
		rank, next = next, rank
		if classes == total-1 {
			break // every suffix distinct — the order is already final
		}
	}

	// Kasai's scan: walk the text positions left to right, matching each
	// suffix against its predecessor in sorted order. Dropping a leading
	// symbol from both sides of a match shortens it by at most one, so a
	// single extending counter h that only ever retreats by one per step
	// settles every adjacent LCP within 2N symbol comparisons.
	posOf := make([]int, total)
	for p := 0; p < total; p++ {
		posOf[sa[p]] = p
	}
	lcp := make([]int, total) // lcp[i] = shared prefix of sa[i-1] and sa[i]
	h := 0
	for i := 0; i < total; i++ {
		if posOf[i] > 0 {
			j := sa[posOf[i]-1]
			for i+h < total && j+h < total && text[i+h] == text[j+h] {
				h++
			}
			lcp[posOf[i]] = h
			if h > 0 {
				h--
			}
		} else {
			h = 0
		}
	}

	// Suffixes that start on a separator cannot share even one symbol with
	// another suffix, so the sweep below keeps only suffixes that start on
	// a value. The LCP of consecutive kept suffixes is the minimum over the
	// span of dropped ones between them (the shared prefix of a sorted
	// range is the minimum of its adjacent LCPs), folded in one pass with
	// a running minimum.
	seqOf := make([]int, 0, total)
	spanLcp := make([]int, 0, total)
	span := total
	for i := 0; i < total; i++ {
		if lcp[i] < span {
			span = lcp[i]
		}
		who := owner[sa[i]]
		if who >= 0 {
			seqOf = append(seqOf, who)
			spanLcp = append(spanLcp, span)
			span = total
		}
	}
	m := len(seqOf)

	// A segment shared by every sequence is a prefix shared by one suffix
	// of each sequence, and such suffixes occupy one contiguous block of
	// the sorted order — so the answer is the deepest window of the suffix
	// array that still holds a suffix from every sequence, its depth being
	// the minimum adjacent LCP inside it. Two pointers sweep the narrowest
	// covering windows (shrinking can only deepen the minimum), and a
	// monotonic deque carries that minimum at its front: each suffix enters
	// and leaves the window once.
	best := 0
	cnt := make([]int, k)
	have := 0
	left := 0
	window := make([]int, 0, m) // deque of spanLcp indices, values increasing
	head := 0                   // front of the deque inside window
	for right := 0; right < m; right++ {
		who := seqOf[right]
		if cnt[who] == 0 {
			have++
		}
		cnt[who]++
		for len(window) > head && spanLcp[window[len(window)-1]] >= spanLcp[right] {
			window = window[:len(window)-1]
		}
		window = append(window, right)
		for have == k {
			for len(window) > head && window[head] <= left {
				head++
			}
			if len(window) > head && spanLcp[window[head]] > best {
				best = spanLcp[window[head]]
			}
			gone := seqOf[left]
			cnt[gone]--
			if cnt[gone] == 0 {
				have--
			}
			left++
		}
	}
	return best
}
