import (
	"sort"
)

func getKth(lo int, hi int, k int) int {
	// Memoized path replay: walk each value's Collatz chain, recording
	// the route until it lands on a value whose power is already known,
	// then back-fill the recorded path. Fully iterative, and shared
	// steps between values are computed once.
	memo := map[int]int{1: 0}
	powerOf := func(start int) int {
		x := start
		path := []int{}
		for {
			known, ok := memo[x]
			if !ok {
				path = append(path, x)
				if x%2 == 0 {
					x /= 2
				} else {
					x = 3*x + 1
				}
				continue
			}
			steps := known
			for i := len(path) - 1; i >= 0; i-- {
				steps++
				memo[path[i]] = steps
			}
			return steps
		}
	}
	values := make([]int, hi-lo+1)
	for index := range values {
		values[index] = lo + index
	}
	sort.SliceStable(values, func(a, b int) bool {
		pa, pb := powerOf(values[a]), powerOf(values[b])
		if pa != pb {
			return pa < pb
		}
		return values[a] < values[b]
	})
	return values[k-1]
}
