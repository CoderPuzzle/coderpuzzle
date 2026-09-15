import "sort"

// Equalizing a window costs sum(|v - t|), minimized when t is a median.
// A sliding window over a Fenwick tree (compressed values) yields every
// x-window's cost in O(log n): kth finds the median and prefix count/sum
// split the window about it. A rolling DP then picks k non-overlapping
// windows.
func minOperations(nums []int, x int, k int) int64 {
	n := len(nums)
	vals := append([]int(nil), nums...)
	sort.Ints(vals)
	uniq := vals[:0]
	for _, v := range vals {
		if len(uniq) == 0 || uniq[len(uniq)-1] != v {
			uniq = append(uniq, v)
		}
	}
	vals = uniq
	m := len(vals)

	cnt := make([]int, m+1)
	sm := make([]int64, m+1)

	comp := func(v int) int {
		return sort.SearchInts(vals, v) + 1
	}

	winCount := n - x + 1
	costs := make([]int64, winCount)
	var total int64
	for i, v := range nums {
		for p := comp(v); p <= m; p += p & -p {
			cnt[p]++
			sm[p] += int64(v)
		}
		total += int64(v)
		if i >= x {
			old := nums[i-x]
			for p := comp(old); p <= m; p += p & -p {
				cnt[p]--
				sm[p] -= int64(old)
			}
			total -= int64(old)
		}
		if i >= x-1 {
			kpos := (x + 1) / 2
			pos := 0
			acc := 0
			step := 1
			for step<<1 <= m {
				step <<= 1
			}
			for ; step > 0; step >>= 1 {
				nxt := pos + step
				if nxt <= m && acc+cnt[nxt] < kpos {
					pos = nxt
					acc += cnt[nxt]
				}
			}
			midIdx := pos + 1
			c := 0
			var s int64
			for p := midIdx; p > 0; p -= p & -p {
				c += cnt[p]
				s += sm[p]
			}
			med := int64(vals[midIdx-1])
			costs[i-x+1] = med*int64(c) - s + (total - s) - med*int64(x-c)
		}
	}

	const INF = int64(1) << 60
	prev := make([]int64, winCount) // t = 0 windows: cost 0 everywhere
	for t := 1; t <= k; t++ {
		cur := make([]int64, winCount)
		for i := range cur {
			cur[i] = INF
		}
		for i := 0; i < winCount; i++ {
			best := INF
			if i > 0 {
				best = cur[i-1]
			}
			if t == 1 {
				if costs[i] < best {
					best = costs[i]
				}
			} else if i >= x {
				take := costs[i] + prev[i-x]
				if take < best {
					best = take
				}
			}
			cur[i] = best
		}
		copy(prev, cur)
	}
	return prev[winCount-1]
}
