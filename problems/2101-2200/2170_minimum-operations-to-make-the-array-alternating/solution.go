import "sort"

// An alternating array is fixed by one value for even indices and one
// different value for odd indices, so the kept elements are exactly the
// most frequent value on each side. Count both parities, then keep the
// best legal pairing of candidates per side, including a fresh fill value
// worth nothing: the optimal partner need not occur anywhere in nums.
func minimumOperations(nums []int) int {
	n := len(nums)
	if n == 1 {
		return 0
	}
	type tally struct {
		value int
		count int
	}
	fresh := 0
	for _, value := range nums {
		if value > fresh {
			fresh = value
		}
	}
	fresh++
	count := func(start int) []tally {
		counts := map[int]int{}
		for i := start; i < n; i += 2 {
			counts[nums[i]]++
		}
		ranked := make([]tally, 0, len(counts)+1)
		for value, c := range counts {
			ranked = append(ranked, tally{value, c})
		}
		sort.Slice(ranked, func(a, b int) bool {
			if ranked[a].count != ranked[b].count {
				return ranked[a].count > ranked[b].count
			}
			return ranked[a].value < ranked[b].value
		})
		if len(ranked) > 2 {
			ranked = ranked[:2]
		}
		return append(ranked, tally{fresh, 0})
	}
	evens := count(0)
	odds := count(1)
	best := n
	for _, e := range evens {
		for _, o := range odds {
			if e.value == o.value {
				continue
			}
			if n-e.count-o.count < best {
				best = n - e.count - o.count
			}
		}
	}
	return best
}
