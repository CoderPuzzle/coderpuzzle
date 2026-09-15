// floorDiv divides the way buckets need: Go's / truncates toward zero, and
// negative values must land in the bucket they belong to.
func floorDiv(x, w int64) int64 {
	q := x / w
	if x%w != 0 && x < 0 {
		q--
	}
	return q
}

// Value buckets of width valueDiff + 1, keyed by floor division: two values
// in one bucket are within valueDiff by construction, so each bucket holds at
// most one live value and a same-bucket hit is a "yes".
func containsNearbyAlmostDuplicate(nums []int64, indexDiff int64, valueDiff int64) bool {
	width := valueDiff + 1
	buckets := make(map[int64]int64)
	for index, value := range nums {
		if int64(index) > indexDiff {
			// The window spans only the previous indexDiff positions;
			// retire the bucket of the value that just fell out of it.
			delete(buckets, floorDiv(nums[int64(index)-indexDiff-1], width))
		}
		bucket := floorDiv(value, width)
		if _, ok := buckets[bucket]; ok {
			return true
		}
		// Neighbor buckets can hold values up to 2*valueDiff away, so their
		// occupants need a real distance comparison.
		if below, ok := buckets[bucket-1]; ok && value-below <= valueDiff {
			return true
		}
		if above, ok := buckets[bucket+1]; ok && above-value <= valueDiff {
			return true
		}
		buckets[bucket] = value
	}
	return false
}
