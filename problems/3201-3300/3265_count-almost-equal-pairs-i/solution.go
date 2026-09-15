import "strconv"

func countPairs(nums []int) int {
	// The family of a value holds every number reachable by
	// exchanging two of its digits at most once, itself included;
	// swapped strings parse back through strconv.Atoi, so leading
	// zeros collapse (30 -> "03" -> 3). A pair qualifies when either
	// side sits in the other's family; one swap may touch one number
	// only, so both directions are tested.
	families := make([]map[int]bool, len(nums))
	for i, num := range nums {
		digits := []byte(strconv.Itoa(num))
		reached := map[int]bool{num: true}
		for p := 0; p < len(digits); p++ {
			for q := p + 1; q < len(digits); q++ {
				swapped := append([]byte(nil), digits...)
				swapped[p], swapped[q] = swapped[q], swapped[p]
				value, _ := strconv.Atoi(string(swapped))
				reached[value] = true
			}
		}
		families[i] = reached
	}
	pairs := 0
	for i := range nums {
		for j := i + 1; j < len(nums); j++ {
			if families[i][nums[j]] || families[j][nums[i]] {
				pairs++
			}
		}
	}
	return pairs
}
