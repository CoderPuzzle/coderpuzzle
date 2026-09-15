// Read the sequences as a precedence graph: each consecutive pair pins u
// before v, and the shortest supersequences are exactly the permutations of
// [1, n] respecting every pinned pair. Kahn's algorithm peels the graph's
// sources in order; the order is forced exactly when there is never more than
// one source to pick from.
func sequenceReconstruction(nums []int, sequences [][]int) bool {
	n := len(nums)
	for _, seq := range sequences {
		for _, x := range seq {
			// A value outside [1, n] cannot occur in nums at all, so nums is
			// not even a supersequence.
			if x < 1 || x > n {
				return false
			}
		}
	}
	successors := make([][]int, n+1)
	unpinned := make([]int, n+1)
	for _, seq := range sequences {
		for j := 0; j+1 < len(seq); j++ {
			u, v := seq[j], seq[j+1]
			// A repeated pair only pads v's count; every copy is discharged
			// together when u is picked, so multiplicity is harmless. A pair
			// pinned to one value never discharges and reads as a loop.
			successors[u] = append(successors[u], v)
			unpinned[v]++
		}
	}
	// The free values are the ones with no unpinned predecessor left: two at
	// once could each come next, none means the pairs loop.
	var free []int
	for x := 1; x <= n; x++ {
		if unpinned[x] == 0 {
			free = append(free, x)
		}
	}
	for _, want := range nums {
		if len(free) != 1 {
			return false
		}
		u := free[0]
		free = free[1:]
		// The forced next value must be nums's own next value.
		if u != want {
			return false
		}
		for _, v := range successors[u] {
			unpinned[v]--
			if unpinned[v] == 0 {
				free = append(free, v)
			}
		}
	}
	return true
}
