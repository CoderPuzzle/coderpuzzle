import "math/bits"

// Sweep left to right carrying every segmentation state reachable with
// the one allowed change unspent or already spent exactly once. The
// unspent side is a single lineage (no change means the greedy is
// forced); the spent side holds (open-window mask, best completed count)
// pairs, merged on equal masks because what happens next depends only on
// the mask.
type state struct {
	mask  int
	count int
}

func maxPartitionsAfterOperations(s string, k int) int {
	unspentMask, unspentCount := 0, 0
	spent := []state{}
	for _, ch := range s {
		bit := 1 << (ch - 'a')
		next := make([]state, 0, len(spent)+26)
		for _, st := range spent {
			mask, count := st.mask, st.count
			if mask&bit == 0 {
				if bits.OnesCount(uint(mask)) == k {
					mask = bit
					count++
				} else {
					mask |= bit
				}
			}
			next = merge(next, mask, count)
		}
		for letter := 0; letter < 26; letter++ {
			branch := 1 << letter
			if branch == bit {
				continue
			}
			mask, count := unspentMask, unspentCount
			if mask&branch == 0 {
				if bits.OnesCount(uint(mask)) == k {
					mask = branch
					count++
				} else {
					mask |= branch
				}
			}
			next = merge(next, mask, count)
		}
		spent = next
		if unspentMask&bit == 0 {
			if bits.OnesCount(uint(unspentMask)) == k {
				unspentMask = bit
				unspentCount++
			} else {
				unspentMask |= bit
			}
		}
	}
	best := unspentCount
	for _, st := range spent {
		best = max(best, st.count)
	}
	return best + 1 // the final open partition always counts
}

func merge(pool []state, mask, count int) []state {
	for i := range pool {
		if pool[i].mask == mask {
			pool[i].count = max(pool[i].count, count)
			return pool
		}
	}
	return append(pool, state{mask, count})
}
