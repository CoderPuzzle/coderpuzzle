import "sort"

func maxBalancedSubsequenceSum(nums []int) int64 {
	// Balance rearranges to nums[j] - j >= nums[i] - i, so a subsequence is
	// balanced precisely when b[i] = nums[i] - i is non-decreasing along it.
	// Compress b into ranks to key the Fenwick tree.
	n := len(nums)
	vals := make([]int64, n)
	for i := 0; i < n; i++ {
		vals[i] = int64(nums[i]) - int64(i)
	}
	comp := make([]int64, n)
	copy(comp, vals)
	sort.Slice(comp, func(a, b int) bool { return comp[a] < comp[b] })
	m := 0
	for i := 0; i < n; i++ {
		if i == 0 || comp[i] != comp[i-1] {
			comp[m] = comp[i]
			m++
		}
	}
	comp = comp[:m]

	// Max-flavored Fenwick tree (update propagates dp values upward, query
	// takes the best dp among ranks <= i), initialized to zero — which
	// implements the max(0, ...) cutoff: a single element is always a
	// balanced subsequence, so negative predecessors are ignored and each
	// element may start fresh.
	bit := make([]int64, m+1)

	var ans int64
	ans = -(1 << 62)
	for i := 0; i < n; i++ {
		// dp[i] = nums[i] + best predecessor dp with rank <= j. Ties are fine
		// since equal b values satisfy the rearranged inequality, so the
		// query includes i's own rank.
		j := sort.Search(len(comp), func(a int) bool { return comp[a] >= vals[i] }) + 1
		best := query2926(bit, j)
		var dp int64
		if best <= 0 {
			dp = int64(nums[i])
		} else {
			dp = int64(nums[i]) + best
		}
		if dp > ans {
			ans = dp
		}
		update2926(bit, j, dp)
	}
	return ans
}

func update2926(bit []int64, i int, value int64) {
	m := len(bit) - 1
	for i <= m {
		if value > bit[i] {
			bit[i] = value
		}
		i += i & (-i)
	}
}

func query2926(bit []int64, i int) int64 {
	var best int64
	for i > 0 {
		if bit[i] > best {
			best = bit[i]
		}
		i -= i & (-i)
	}
	return best
}
