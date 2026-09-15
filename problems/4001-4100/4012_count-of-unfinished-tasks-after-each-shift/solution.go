import "sort"

func countTasks(tasks []int, shifts []int) []int {
	n := len(tasks)
	pref := make([]int64, n)
	var acc int64
	for i, t := range tasks {
		acc += int64(t)
		pref[i] = acc
	}
	total := acc
	done := int64(0)
	out := make([]int, 0, len(shifts))
	for _, s := range shifts {
		// done is the cumulative work finished within the current pass;
		// reaching the total ends the pass and discards unused time.
		done += int64(s)
		if done >= total {
			out = append(out, 0)
			done = 0
			continue
		}
		// SearchInts finds the first prefix above done, so boundary
		// landings count as complete: pref[i] <= done means task i is
		// fully finished, and the next task holds all partial work.
		c := sort.Search(len(pref), func(i int) bool { return pref[i] > done })
		out = append(out, n-c)
	}
	return out
}
