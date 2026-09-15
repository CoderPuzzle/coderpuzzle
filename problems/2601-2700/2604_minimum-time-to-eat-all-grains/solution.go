import "sort"

// Binary search the answer T, checked by a greedy sweep. With both arrays
// sorted, hens in ascending order eating contiguous grain prefixes is optimal
// by an exchange argument. A hen at h covering grains up to g needs
// L + R + min(L, R) seconds, where L = max(0, h - leftmost) and
// R = max(0, rightmost - h): whichever extreme the hen reaches second becomes
// the double-walked detour.
func minimumTime(hens []int, grains []int) int {
	sort.Ints(hens)
	sort.Ints(grains)
	lo, hi := 0, 2000000000 // answer <= 1.5e9 since positions <= 1e9
	for lo < hi {
		mid := lo + (hi-lo)/2
		if feasible(mid, hens, grains) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}

func feasible(t int, hens []int, grains []int) bool {
	j := 0
	for _, h := range hens {
		if j == len(grains) {
			break
		}
		left := max(0, h-grains[j])
		k := j
		for k < len(grains) {
			right := max(0, grains[k]-h)
			if min(2*left+right, left+2*right) > t {
				break
			}
			k++
		}
		j = k
	}
	return j == len(grains)
}
