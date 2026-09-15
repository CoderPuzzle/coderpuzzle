import "sort"

// count(x) = #{(i, j) : i < j, nums[i] > nums[j], nums[i] - nums[j] <= x}
// is non-decreasing in x, so binary search the smallest x with count(x) >=
// k. Each count sweeps left to right with a Fenwick tree over the
// compressed values, adding for every j the number of earlier elements
// whose value falls in the window (nums[j], nums[j] + x]. n <= 1e4 bounds
// the pair count by n*(n-1)/2 < 5e7, well inside int.
func minThreshold(nums []int, k int) int {
	vals := append([]int(nil), nums...)
	sort.Ints(vals)
	m := unique(vals)
	maxDiff := vals[m-1] - vals[0]

	count := func(x int64) int64 {
		tree := make([]int, m+1)
		total := int64(0)
		for _, v := range nums {
			c := sort.SearchInts(vals[:m], v)
			// Earlier elements with value in (v, v + x]; the window bound
			// is computed in int64 because v + x can pass 2^31.
			hi := upperBound(vals[:m], int64(v)+x)
			for i := hi; i > 0; i -= i & -i {
				total += int64(tree[i])
			}
			// c is the 0-based compressed index; its Fenwick position is
			// c + 1, so the prefix cut and the insert both start there.
			for i := c + 1; i > 0; i -= i & -i {
				total -= int64(tree[i])
			}
			for i := c + 1; i <= m; i += i & -i {
				tree[i]++
			}
		}
		return total
	}

	if maxDiff == 0 || count(int64(maxDiff)) < int64(k) {
		return -1
	}
	lo, hi := int64(1), int64(maxDiff)
	for lo < hi {
		mid := (lo + hi) / 2
		if count(mid) >= int64(k) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return int(lo)
}

// Compacts the sorted slice in place to its distinct values.
func unique(sorted []int) int {
	out := 0
	for _, v := range sorted {
		if out == 0 || v != sorted[out-1] {
			sorted[out] = v
			out++
		}
	}
	return out
}

// First index with sorted[idx] > key.
func upperBound(sorted []int, key int64) int {
	lo, hi := 0, len(sorted)
	for lo < hi {
		mid := (lo + hi) / 2
		if int64(sorted[mid]) <= key {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	return lo
}
