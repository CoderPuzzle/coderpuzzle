// One pass, three slots: each slot is a pointer so nil can mark "not yet
// filled" — math.MinInt32 itself is a legal value, no sentinel constant.
func thirdMax(nums []int) int {
	var first, second, third *int
	for _, value := range nums {
		// A repeat of an already-tracked value changes nothing.
		if same(first, value) || same(second, value) || same(third, value) {
			continue
		}
		switch {
		case first == nil || value > *first:
			third, second, first = second, first, &value
		case second == nil || value > *second:
			third, second = second, &value
		case third == nil || value > *third:
			third = &value
		}
	}
	// No third distinct maximum: fall back to the maximum.
	if third == nil {
		return *first
	}
	return *third
}

func same(slot *int, value int) bool {
	return slot != nil && *slot == value
}
