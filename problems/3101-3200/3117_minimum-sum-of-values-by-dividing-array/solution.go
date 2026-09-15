// Layered DP: g[k] after j rounds = min value sum splitting nums[:k] into
// exactly j segments matching andValues[:j]. For a fixed right end r the
// starts l with AND(nums[l..r]) == t form ONE contiguous run inside the
// classic AND-group list (extending r folds every stored value with
// nums[r]; equal results merge into one range), so a transition is a
// range-minimum over the previous layer, served by a small iterative
// segment tree. Costs stay below m * max(nums) < 10^6, well inside an int.
func minimumValueSum(nums []int, andValues []int) int {
	n := len(nums)
	const infty = 1 << 30

	groupVals := make([][]int, n)
	groupStarts := make([][]int, n)
	var vals, starts []int
	for r, x := range nums {
		nvals := []int{x}
		nstarts := []int{r}
		for i := range vals {
			v := vals[i] & x
			if v != nvals[len(nvals)-1] {
				nvals = append(nvals, v)
				nstarts = append(nstarts, starts[i])
			} else {
				nstarts[len(nstarts)-1] = starts[i]
			}
		}
		vals, starts = nvals, nstarts
		groupVals[r] = vals
		groupStarts[r] = starts
	}

	prev := make([]int, n+1)
	for i := range prev {
		prev[i] = infty
	}
	prev[0] = 0
	size := n + 1
	for _, target := range andValues {
		tree := make([]int, 2*size)
		for i := range tree {
			tree[i] = infty
		}
		copy(tree[size:], prev)
		for k := size - 1; k > 0; k-- {
			tree[k] = min(tree[2*k], tree[2*k+1])
		}

		cur := make([]int, n+1)
		for i := range cur {
			cur[i] = infty
		}
		for r := 0; r < n; r++ {
			lo, hi := -1, -2
			for gi, v := range groupVals[r] {
				if v == target {
					lo = groupStarts[r][gi]
					if gi > 0 {
						hi = groupStarts[r][gi-1] - 1
					} else {
						hi = r
					}
					break
				}
			}
			if lo < 0 {
				continue // this target cannot end at r
			}
			best := infty
			for l, rr := lo+size, hi+1+size; l < rr; l, rr = l>>1, rr>>1 {
				if l&1 == 1 {
					best = min(best, tree[l])
					l++
				}
				if rr&1 == 1 {
					rr--
					best = min(best, tree[rr])
				}
			}
			if best < infty {
				cur[r+1] = best + nums[r]
			}
		}
		prev = cur
	}

	if prev[n] < infty {
		return prev[n]
	}
	return -1
}
