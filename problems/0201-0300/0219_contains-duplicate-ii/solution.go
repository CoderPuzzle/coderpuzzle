// Hash map from value -> last index seen: of all earlier copies of a value,
// the most recent one is the nearest, so one lookup answers "was this value
// within k positions?" in O(1).
func containsNearbyDuplicate(nums []int, k int) bool {
	lastIndex := make(map[int]int, len(nums))
	for index, value := range nums {
		// Look up before inserting, and compare against the LAST earlier
		// occurrence only: if it is out of range, every older one is too.
		if earlier, seen := lastIndex[value]; seen && index-earlier <= k {
			return true
		}
		// Overwrite so the entry always holds the most recent position —
		// a first-occurrence map would miss later, closer pairs.
		lastIndex[value] = index
	}
	return false
}
