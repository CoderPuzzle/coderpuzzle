import (
	"sort"
)

func minWastedSpace(packages []int, boxes [][]int) int64 {
	// Per supplier: sorted boxes assign each package its smallest fitting
	// size; waste = count*(box) - range package sum via prefix sums.
	// Skip suppliers whose largest box is too small.
	n := len(packages)
	pkg := make([]int64, n)
	for i, v := range packages {
		pkg[i] = int64(v)
	}
	sort.Slice(pkg, func(i, j int) bool { return pkg[i] < pkg[j] })
	pre := make([]int64, n+1)
	for i := 0; i < n; i++ {
		pre[i+1] = pre[i] + pkg[i]
	}
	var best int64 = -1
	for _, supplier := range boxes {
		s := make([]int, len(supplier))
		copy(s, supplier)
		sort.Ints(s)
		if int64(s[len(s)-1]) < pkg[n-1] {
			continue
		}
		var waste int64
		prev := 0
		for _, b := range s {
			cnt := sort.Search(len(pkg), func(i int) bool { return pkg[i] > int64(b) })
			if cnt > prev {
				waste += int64(cnt-prev)*int64(b) - (pre[cnt] - pre[prev])
				prev = cnt
			}
			if prev == n {
				break
			}
		}
		if best < 0 || waste < best {
			best = waste
		}
	}
	if best < 0 {
		return -1
	}
	return best % 1000000007
}
