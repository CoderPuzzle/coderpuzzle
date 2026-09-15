package main

type Solution struct{}

func (solution *Solution) firstBadVersion(versionControl *VersionControl, n int) int {
	// The predicate flips exactly once along [1, n] — good up to the
	// hidden boundary, bad from it on — so bisect for the first true.
	lo, hi := 1, n
	for lo < hi {
		// Overflow-safe midpoint: lo + (hi-lo)/2 never exceeds hi, where
		// (lo+hi)/2 overflows int on the full [1, 2147483647] range.
		mid := lo + (hi-lo)/2
		if versionControl.IsBadVersion(mid) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}
