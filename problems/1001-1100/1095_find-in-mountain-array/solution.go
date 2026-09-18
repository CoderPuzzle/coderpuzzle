package main

type Solution struct{}

func (solution *Solution) findInMountainArray(reader *MountainArray, target int) int {
	n := reader.Length()

	// Peak: the last index still on the rising slope — Get(mid - 1) <
	// Get(mid) means mid has not passed the peak yet.
	lo, hi := 1, n-2
	for lo < hi {
		mid := (lo + hi + 1) / 2
		if reader.Get(mid-1) < reader.Get(mid) {
			lo = mid
		} else {
			hi = mid - 1
		}
	}
	peak := lo

	// Ascending slope: smallest index with value >= target.
	lo, hi = 0, peak
	for lo < hi {
		mid := (lo + hi) / 2
		if reader.Get(mid) < target {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	if reader.Get(lo) == target {
		return lo
	}

	// Descending slope: smallest index with value <= target.
	lo, hi = peak, n-1
	for lo < hi {
		mid := (lo + hi) / 2
		if reader.Get(mid) > target {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	if reader.Get(lo) == target {
		return lo
	}
	return -1
}
