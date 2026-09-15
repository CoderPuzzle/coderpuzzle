import (
	"math/bits"
	"sort"
)

func minMergeCost(lists [][]int) int64 {
	n := len(lists)
	size := 1 << n

	// Total length of every mask, built up from its lowest set bit.
	totalLen := make([]int64, size)
	for mask := 1; mask < size; mask++ {
		low := mask & -mask
		idx := bits.TrailingZeros(uint(low))
		totalLen[mask] = totalLen[mask^low] + int64(len(lists[idx]))
	}

	// Left-middle median of every mask, found without materializing the
	// merged list: binary search the sorted value pool for the smallest
	// value with more than half the mask's elements at or below it.
	var vals []int
	for _, one := range lists {
		vals = append(vals, one...)
	}
	sort.Ints(vals)
	med := make([]int64, size)
	for mask := 1; mask < size; mask++ {
		rank := int((totalLen[mask] - 1) / 2)
		lo, hi := 0, len(vals)-1
		for lo < hi {
			mid := int(uint(lo+hi) / 2)
			cnt := 0
			for i := 0; i < n; i++ {
				if mask>>uint(i)&1 == 1 {
					cnt += sort.Search(len(lists[i]), func(k int) bool {
						return lists[i][k] > vals[mid]
					})
				}
			}
			if cnt > rank {
				hi = mid
			} else {
				lo = mid + 1
			}
		}
		med[mask] = int64(vals[lo])
	}

	// dp over subsets: the last merge of a mask always pays the mask's
	// total length plus the gap between the two merged-in medians, so
	// only the split itself is a free choice.
	const inf = int64(1) << 60
	dp := make([]int64, size)
	for i := range dp {
		dp[i] = inf
	}
	for mask := 1; mask < size; mask++ {
		if mask&(mask-1) == 0 {
			dp[mask] = 0
			continue
		}
		best := inf
		for sub := (mask - 1) & mask; sub != 0; sub = (sub - 1) & mask {
			other := mask ^ sub
			if sub < other {
				// each unordered split exactly once
				gap := med[sub] - med[other]
				if gap < 0 {
					gap = -gap
				}
				cost := dp[sub] + dp[other] + totalLen[mask] + gap
				if cost < best {
					best = cost
				}
			}
		}
		dp[mask] = best
	}
	return dp[size-1]
}
