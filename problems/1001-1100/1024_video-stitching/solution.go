import "sort"

func videoStitching(clips [][]int, time int) int {
	// Jump-game greedy over clips sorted by start.
	ordered := make([][]int, len(clips))
	copy(ordered, clips)
	sort.Slice(ordered, func(a, b int) bool {
		if ordered[a][0] != ordered[b][0] {
			return ordered[a][0] < ordered[b][0]
		}
		return ordered[a][1] < ordered[b][1]
	})
	count := 0
	covered := 0
	farthest := 0
	i := 0
	n := len(ordered)
	for covered < time {
		// Cursor i never resets: every clip starting at or before `covered`
		// is examined once, tracking the farthest reach it enables.
		for i < n && ordered[i][0] <= covered {
			if ordered[i][1] > farthest {
				farthest = ordered[i][1]
			}
			i++
		}
		// No usable clip reaches past the current coverage: an unbridgeable gap.
		if farthest == covered {
			return -1
		}
		// Take one clip — the farthest-reaching — and jump the frontier.
		covered = farthest
		count++
	}
	return count
}
