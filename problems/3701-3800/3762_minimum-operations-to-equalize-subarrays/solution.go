import "sort"

func minOperations(nums []int, k int, queries [][]int) []int64 {
	n := len(nums)
	// Remainder runs: a window is equalizable iff it sits inside one
	// maximal run of equal remainders, i.e. iff l and r share a mark.
	run := make([]int, n)
	for i := 1; i < n; i++ {
		add := 0
		if nums[i]%k != nums[i-1]%k {
			add = 1
		}
		run[i] = run[i-1] + add
	}
	quot := make([]int, n)
	for i, value := range nums {
		quot[i] = value / k
	}
	// Merge sort tree over the quotients: each node keeps its values
	// sorted plus prefix sums of that order.
	sortedNodes := make([][]int, 4*n)
	prefixNodes := make([][]int64, 4*n)
	var build func(node, lo, hi int)
	build = func(node, lo, hi int) {
		if lo == hi {
			sortedNodes[node] = []int{quot[lo]}
			prefixNodes[node] = []int64{0, int64(quot[lo])}
			return
		}
		mid := (lo + hi) >> 1
		build(2*node, lo, mid)
		build(2*node+1, mid+1, hi)
		merged := make([]int, 0, len(sortedNodes[2*node])+len(sortedNodes[2*node+1]))
		merged = append(merged, sortedNodes[2*node]...)
		merged = append(merged, sortedNodes[2*node+1]...)
		sort.Ints(merged)
		pref := make([]int64, len(merged)+1)
		for i, value := range merged {
			pref[i+1] = pref[i] + int64(value)
		}
		sortedNodes[node] = merged
		prefixNodes[node] = pref
	}
	build(1, 0, n-1)

	type piece struct {
		vec  []int
		pref []int64
	}
	countLeSum := func(pieces []piece, x int64) (int64, int64) {
		var count, total int64
		for _, pc := range pieces {
			cut := sort.Search(len(pc.vec), func(i int) bool { return int64(pc.vec[i]) > x })
			count += int64(cut)
			total += pc.pref[cut]
		}
		return count, total
	}

	result := make([]int64, len(queries))
	type frame struct{ node, lo, hi int }
	for qi, query := range queries {
		l, r := query[0], query[1]
		if run[l] != run[r] {
			result[qi] = -1
			continue
		}
		// Decompose the window into tree nodes; the set stays fixed for
		// the whole query.
		var pieces []piece
		stack := []frame{{1, 0, n - 1}}
		for len(stack) > 0 {
			f := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			if r < f.lo || f.hi < l {
				continue
			}
			if l <= f.lo && f.hi <= r {
				pieces = append(pieces, piece{sortedNodes[f.node], prefixNodes[f.node]})
				continue
			}
			mid := (f.lo + f.hi) >> 1
			stack = append(stack, frame{2 * f.node, f.lo, mid})
			stack = append(stack, frame{2*f.node + 1, mid + 1, f.hi})
		}
		// Smallest quotient whose inclusive rank reaches the lower median;
		// the decomposition's node set is fixed throughout.
		need := int64(r-l+2) / 2
		lo, hi := int64(-1), int64(-1)
		for _, pc := range pieces {
			first := int64(pc.vec[0])
			last := int64(pc.vec[len(pc.vec)-1])
			if lo < 0 || first < lo {
				lo = first
			}
			if last > hi {
				hi = last
			}
		}
		for lo < hi {
			mid := lo + (hi-lo)/2
			if count, _ := countLeSum(pieces, mid); count >= need {
				hi = mid
			} else {
				lo = mid + 1
			}
		}
		median := lo
		size := int64(r - l + 1)
		atCount, atSum := countLeSum(pieces, median)
		belowCount, belowSum := countLeSum(pieces, median-1)
		var grandTotal int64
		for _, pc := range pieces {
			grandTotal += pc.pref[len(pc.pref)-1]
		}
		// Below-median elements climb by their shortfall; above-median
		// ones descend by their excess; equals cost nothing.
		result[qi] = median*belowCount - belowSum +
			((grandTotal - atSum) - median*(size-atCount))
	}
	return result
}
