// Distinct timestamps with their hit counts, oldest first; getHits drops
// everything at or before timestamp-300 off the front and sums what
// survives — the window is (timestamp-300, timestamp].
type HitCounter struct {
	times  []int
	counts []int
}

func NewHitCounterTyped() *HitCounter {
	return &HitCounter{}
}

func (design *HitCounter) hit(timestamp int) {
	if n := len(design.times); n > 0 && design.times[n-1] == timestamp {
		// Several hits may arrive at the same second; bumping the newest
		// count keeps one entry per distinct timestamp.
		design.counts[n-1]++
	} else {
		design.times = append(design.times, timestamp)
		design.counts = append(design.counts, 1)
	}
}

func (design *HitCounter) getHits(timestamp int) int {
	cutoff := timestamp - 300
	for len(design.times) > 0 && design.times[0] <= cutoff {
		// Slicing off the front retires the stale second in O(1).
		design.times = design.times[1:]
		design.counts = design.counts[1:]
	}
	total := 0
	for _, count := range design.counts {
		total += count
	}
	return total
}
