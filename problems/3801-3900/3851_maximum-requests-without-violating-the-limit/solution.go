import "sort"

// The limit is per user, so users never interact: group each user's
// times, sort them, and greedily keep every time whose k-back kept
// predecessor sits more than window away. The kept count is at most
// the request count <= 10^5, so int arithmetic is exact throughout.
func maxRequests(requests [][]int, k int, window int) int {
	byUser := make(map[int][]int)
	for _, r := range requests {
		byUser[r[0]] = append(byUser[r[0]], r[1])
	}
	total := 0
	for _, times := range byUser {
		sort.Ints(times)
		kept := make([]int, 0, len(times))
		for _, t := range times {
			// Appending t is legal iff the k+1 last kept times span
			// strictly more than window: t - kept[len-k] > window.
			if len(kept) < k || t-kept[len(kept)-k] > window {
				kept = append(kept, t)
			}
		}
		total += len(kept)
	}
	return total
}
