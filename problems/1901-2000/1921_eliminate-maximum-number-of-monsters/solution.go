import "sort"

// Monster i reaches the city at minute ceil(dist[i]/speed[i]) — at
// that exact minute it already counts as a loss. The i-th shot
// happens at minute i, so after sorting arrival minutes the answer
// is the first position where the arrival is not strictly later
// than the shot.
func eliminateMaximum(dist []int, speed []int) int {
	arrivals := make([]int, len(dist))
	for i, d := range dist {
		arrivals[i] = (d + speed[i] - 1) / speed[i]
	}
	sort.Ints(arrivals)
	for i, a := range arrivals {
		if a <= i {
			return i
		}
	}
	return len(arrivals)
}
