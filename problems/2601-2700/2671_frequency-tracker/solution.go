package main

// Two counters kept in lockstep: number -> how many copies sit in the
// structure, and frequency -> how many numbers currently occur that often.
// Each add/delete moves one number between adjacent frequency buckets, so
// any hasFrequency question becomes a single lookup.
type FrequencyTracker struct {
	countOf   map[int]int
	numbersAt map[int]int
}

func NewFrequencyTrackerTyped() *FrequencyTracker {
	return &FrequencyTracker{
		countOf:   make(map[int]int),
		numbersAt: make(map[int]int),
	}
}

func (design *FrequencyTracker) add(number int) {
	count := design.countOf[number]
	design.countOf[number] = count + 1
	if count > 0 {
		design.numbersAt[count]--
	}
	design.numbersAt[count+1]++
}

func (design *FrequencyTracker) deleteOne(number int) {
	count := design.countOf[number]
	// The structure may not contain it; delete nothing then.
	if count == 0 {
		return
	}
	design.countOf[number] = count - 1
	design.numbersAt[count]--
	if count > 1 {
		design.numbersAt[count-1]++
	}
}

func (design *FrequencyTracker) hasFrequency(frequency int) bool {
	return design.numbersAt[frequency] > 0
}
