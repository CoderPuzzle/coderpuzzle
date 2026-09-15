import "sort"

// Extended Boyer-Moore voting: two candidate slots, two counters. A match
// raises its slot's counter, a zero counter adopts the current value, and a
// value matching neither slot spends both counters.
func majorityElement(nums []int) []int {
	candidate1, count1 := 0, 0
	candidate2, count2 := 0, 0
	for _, value := range nums {
		switch {
		case value == candidate1:
			count1++
		case value == candidate2:
			count2++
		case count1 == 0:
			candidate1, count1 = value, 1
		case count2 == 0:
			candidate2, count2 = value, 1
		default:
			count1--
			count2--
		}
	}
	// The vote only nominates; a verification pass counts each nominee's real
	// occurrences and keeps only those above the floor(n/3) bar.
	threshold := len(nums) / 3
	total1, total2 := 0, 0
	for _, value := range nums {
		if value == candidate1 {
			total1++
		} else if value == candidate2 {
			total2++
		}
	}
	// Start at an empty, non-nil slice so an empty answer encodes as [].
	result := []int{}
	if total1 > threshold {
		result = append(result, candidate1)
	}
	if candidate2 != candidate1 && total2 > threshold {
		result = append(result, candidate2)
	}
	// At most two answers survive; sorting pins the ascending order the
	// examples show.
	sort.Ints(result)
	return result
}
