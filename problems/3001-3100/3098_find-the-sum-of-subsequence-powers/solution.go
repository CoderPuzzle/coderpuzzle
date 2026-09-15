import "sort"

func sumOfPowers(nums []int, k int) int {
	const MOD = 1000000007
	n := len(nums)
	a := make([]int64, n)
	for i, v := range nums {
		a[i] = int64(v)
	}
	sort.Slice(a, func(i, j int) bool { return a[i] < a[j] })

	seen := make(map[int64]struct{})
	allDiffs := make([]int64, 0, n*(n-1)/2)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			d := a[j] - a[i]
			if _, ok := seen[d]; !ok {
				seen[d] = struct{}{}
				allDiffs = append(allDiffs, d)
			}
		}
	}
	sort.Slice(allDiffs, func(i, j int) bool { return allDiffs[i] < allDiffs[j] })

	var countAtLeast func(d int64) int64
	countAtLeast = func(d int64) int64 {
		// number of length-k subsequences with all adjacent gaps >= d
		splits := make([]int, n)
		for j := 0; j < n; j++ {
			target := a[j] - d
			lo, hi := 0, j
			for lo < hi {
				mid := lo + (hi-lo)/2
				if a[mid] <= target {
					lo = mid + 1
				} else {
					hi = mid
				}
			}
			splits[j] = lo
		}
		prev := make([]int64, n)
		for i := range prev {
			prev[i] = 1
		}
		for length := 2; length <= k; length++ {
			pref := make([]int64, n+1)
			for i := 0; i < n; i++ {
				pref[i+1] = pref[i] + prev[i]
			}
			if pref[n] == 0 {
				return 0
			}
			cur := make([]int64, n)
			for j := 0; j < n; j++ {
				cur[j] = pref[splits[j]] % MOD
			}
			prev = cur
		}
		var total int64
		for _, v := range prev {
			total += v
		}
		return total % MOD
	}

	var ans int64
	var prevF int64
	for idx := len(allDiffs) - 1; idx >= 0; idx-- {
		d := allDiffs[idx]
		f := countAtLeast(d)
		g := ((f-prevF)%MOD + MOD) % MOD
		ans = (ans + (d%MOD)*g%MOD) % MOD
		prevF = f
	}
	return int(ans)
}
