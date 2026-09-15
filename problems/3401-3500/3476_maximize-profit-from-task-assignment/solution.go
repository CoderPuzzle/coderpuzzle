import "sort"

// Skills partition the problem: inside one skill class every worker is
// interchangeable and can take any task of that class, so the k workers of
// a skill simply claim its k most profitable tasks. The extra worker then
// claims the best leftover overall.
func maxProfit(workers []int, tasks [][]int) int64 {
	counts := make(map[int]int)
	for _, w := range workers {
		counts[w]++
	}
	groups := make(map[int][]int)
	for _, t := range tasks {
		groups[t[0]] = append(groups[t[0]], t[1])
	}
	var total int64
	var bestExtra int64
	for skill, profits := range groups {
		sort.Sort(sort.Reverse(sort.IntSlice(profits)))
		take := counts[skill]
		if take > len(profits) {
			take = len(profits)
		}
		// Profits reach 1e9 with up to 1e5+1 assignments, so the total
		// accumulates in int64 (~1e14 at most).
		for i := 0; i < take; i++ {
			total += int64(profits[i])
		}
		if take < len(profits) && int64(profits[take]) > bestExtra {
			bestExtra = int64(profits[take])
		}
	}
	return total + bestExtra
}
