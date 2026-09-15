func score(cards []string, x string) int {
	// A one-sided pool (26 counts, zeros included) plus `helpers` double-x
	// cards: every pair consumes at least one letter card, every pair needs
	// a partner outside the largest class, and only so many pairs fit at
	// all — the tight bound is the smallest.
	bestPairs := func(counts []int, helpers int) int {
		total, largest := 0, 0
		for _, count := range counts {
			total += count
			if count > largest {
				largest = count
			}
		}
		if total == 0 {
			return 0
		}
		best := (total + helpers) / 2
		if total+helpers-largest < best {
			best = total + helpers - largest
		}
		if total < best {
			best = total
		}
		return best
	}

	both := 0
	firstOnly := make([]int, 26)
	secondOnly := make([]int, 26)
	for _, card := range cards {
		a, b := card[0], card[1]
		if a == x[0] {
			if b == x[0] {
				both++
			} else {
				firstOnly[b-'a']++
			}
		} else if b == x[0] {
			secondOnly[a-'a']++
		}
	}

	// Each double-x card is spent on one side or the other; every matching
	// splits that way, so scanning all splits covers everything.
	best := 0
	for give := 0; give <= both; give++ {
		pairs := bestPairs(firstOnly, give) + bestPairs(secondOnly, both-give)
		if pairs > best {
			best = pairs
		}
	}
	return best
}
