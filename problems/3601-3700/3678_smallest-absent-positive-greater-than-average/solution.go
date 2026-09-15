func smallestAbsent(nums []int) int {
	// A hash set turns "is candidate c present in nums?" into an O(1)
	// lookup, so the answer is found by walking upward from 1.
	present := make(map[int]bool, len(nums))
	var total int64
	for _, value := range nums {
		present[value] = true
		total += int64(value)
	}
	n := len(nums)
	// Skip candidates at or below the average: candidate > total/n is
	// tested as candidate * n > total, an exact integer comparison --
	// equality fails it, so an integral average excludes itself. The walk
	// starts at 1 because the answer must be positive. The sum is
	// accumulated in 64 bits even though it fits in 32 here.
	var candidate int64 = 1
	for candidate*int64(n) <= total {
		candidate++
	}
	for present[int(candidate)] {
		candidate++
	}
	return int(candidate)
}
