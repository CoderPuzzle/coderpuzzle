import "sort"

func maxStarSum(vals []int, edges [][]int, k int) int {
	n := len(vals)
	neighbors := make([][]int, n)
	// Store neighbor values (not indices) while reading edges, so each
	// center later sees its candidates directly.
	for _, edge := range edges {
		neighbors[edge[0]] = append(neighbors[edge[0]], vals[edge[1]])
		neighbors[edge[1]] = append(neighbors[edge[1]], vals[edge[0]])
	}
	// The center alone is a legal star: seed with the best single
	// value, never 0, so all-negative inputs stay negative.
	best := vals[0]
	for _, v := range vals {
		if v > best {
			best = v
		}
	}
	for i := 0; i < n; i++ {
		adjacent := neighbors[i]
		// For a fixed center the best subset is greedy: sorted
		// descending, take neighbors while they help.
		sort.Sort(sort.Reverse(sort.IntSlice(adjacent)))
		total := vals[i]
		take := k
		if len(adjacent) < take {
			take = len(adjacent)
		}
		for j := 0; j < take; j++ {
			// A non-positive neighbor can only lower the sum.
			if adjacent[j] <= 0 {
				break
			}
			total += adjacent[j]
		}
		if total > best {
			best = total
		}
	}
	return best
}
