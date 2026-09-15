// A fixed ring buffer plus a running sum: next writes the incoming value
// over the window's oldest slot, folds the evicted value out of the sum
// and the new one in, and returns sum / count — the sum stays an exact
// integer and only the final step is a division.
type MovingAverage struct {
	window []int
	total  int
	head   int
	count  int
}

func NewMovingAverageTyped(size int) *MovingAverage {
	return &MovingAverage{window: make([]int, size)}
}

func (design *MovingAverage) next(val int) float64 {
	// The head slot holds the oldest value once the window is full;
	// before that the window is still filling and nothing evicts.
	if design.count < len(design.window) {
		design.count++
	} else {
		design.total -= design.window[design.head]
	}
	design.window[design.head] = val
	design.total += val
	design.head = (design.head + 1) % len(design.window)
	return float64(design.total) / float64(design.count)
}
