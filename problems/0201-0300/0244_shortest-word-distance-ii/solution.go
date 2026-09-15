// One index list per word, built once at construction; shortest walks
// the two sorted index lists in lockstep, always advancing the smaller
// index — every pair that can still improve the gap gets examined, so one
// merge finds the closest pair.
type WordDistance struct {
	positions map[string][]int
}

func NewWordDistanceTyped(wordsDict []string) *WordDistance {
	// Appending left to right keeps each list ascending — the walk
	// relies on both lists being sorted.
	positions := make(map[string][]int)
	for index, word := range wordsDict {
		positions[word] = append(positions[word], index)
	}
	return &WordDistance{positions: positions}
}

func (design *WordDistance) shortest(word1 string, word2 string) int {
	first := design.positions[word1]
	second := design.positions[word2]
	best := first[0] - second[0]
	if best < 0 {
		best = -best
	}
	i, j := 0, 0
	for i < len(first) && j < len(second) {
		gap := first[i] - second[j]
		if gap < 0 {
			gap = -gap
		}
		if gap < best {
			best = gap
		}
		// Advancing the larger index can only widen the gap, so the
		// smaller one takes the step.
		if first[i] < second[j] {
			i++
		} else {
			j++
		}
	}
	return best
}
