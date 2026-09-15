import (
	"sort"
)

// In the time-sorted logs each query's hits form a contiguous run (times in
// [q - x, q]). Answering queries in increasing order lets one window serve
// them all; sorting indices keeps answers in place.
func countServers(n int, logs [][]int, x int, queries []int) []int {
	sort.Slice(logs, func(a, b int) bool { return logs[a][1] < logs[b][1] })
	order := make([]int, len(queries))
	for i := range order {
		order[i] = i
	}
	sort.Slice(order, func(a, b int) bool { return queries[order[a]] < queries[order[b]] })
	cnt := make([]int, n+1)
	arr := make([]int, len(queries))
	distinct := 0
	lo, hi := 0, 0
	for _, idx := range order {
		top := queries[idx]
		bottom := top - x
		// <= admits a log at exactly q; strict < keeps q - x inside,
		// so both interval edges stay inclusive.
		for hi < len(logs) && logs[hi][1] <= top {
			cnt[logs[hi][0]]++
			if cnt[logs[hi][0]] == 1 {
				distinct++
			}
			hi++
		}
		for lo < hi && logs[lo][1] < bottom {
			cnt[logs[lo][0]]--
			if cnt[logs[lo][0]] == 0 {
				distinct--
			}
			lo++
		}
		arr[idx] = n - distinct
	}
	return arr
}
