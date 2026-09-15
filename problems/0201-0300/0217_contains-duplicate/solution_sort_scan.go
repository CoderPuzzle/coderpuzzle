import "sort"

func containsDuplicate(nums []int) bool {
	// Sorting drags equal values next to each other, so a duplicate
	// anywhere in the array turns into a matching neighbouring pair.
	ordered := make([]int, len(nums))
	copy(ordered, nums)
	sort.Ints(ordered)
	for i := 1; i < len(ordered); i++ {
		// After sorting only neighbours can be equal, so one comparison
		// per gap rules out every pair that might match.
		if ordered[i-1] == ordered[i] {
			return true
		}
	}
	// Every gap held two different values: nothing repeats.
	return false
}
