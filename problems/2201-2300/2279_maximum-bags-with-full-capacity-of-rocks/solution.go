import (
	"sort"
)

func maximumBags(capacity []int, rocks []int, additionalRocks int) int {
	needs := make([]int64, len(capacity))
	for i := range capacity {
		needs[i] = int64(capacity[i]) - int64(rocks[i])
	}
	sort.Slice(needs, func(i, j int) bool { return needs[i] < needs[j] })
	remaining := int64(additionalRocks)
	full := 0
	for _, need := range needs {
		if need > remaining {
			break
		}
		remaining -= need
		full++
	}
	return full
}
