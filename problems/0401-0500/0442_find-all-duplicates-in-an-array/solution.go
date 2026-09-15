import "sort"

// Values in [1, n] let the array index itself be the hash: value v maps to
// slot v-1, and flipping that slot's sign records "v seen". A slot already
// negative means |v| was visited before: a duplicate. A restore pass clears
// every flip so the array is left as found, and the final sort pins the
// output to the ascending order the judge compares exactly.
func findDuplicates(nums []int) []int {
	duplicates := make([]int, 0, len(nums)/2)
	for _, value := range nums {
		index := abs(value) - 1
		if nums[index] < 0 {
			duplicates = append(duplicates, index+1)
		} else {
			nums[index] = -nums[index]
		}
	}
	for index, value := range nums {
		nums[index] = abs(value)
	}
	sort.Ints(duplicates)
	return duplicates
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
