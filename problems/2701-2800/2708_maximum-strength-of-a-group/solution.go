import "sort"

func maxStrength(nums []int) int64 {
	// Sorting gathers the negatives at the front. Zeros never help (any kept
	// product has magnitude >= 1), and negatives only pay off in even counts,
	// so multiply every nonzero element except — when the negative count is
	// odd — nums[neg-1], the one closest to zero. If nothing survives, the
	// best group is the largest single element. Products reach 9^13 ~ 2.5e12,
	// so multiply in 64 bits.
	sort.Ints(nums)
	neg := 0
	for _, v := range nums {
		if v < 0 {
			neg++
		}
	}
	skip := -1
	if neg%2 == 1 {
		skip = neg - 1
	}
	prod := int64(1)
	kept := false
	for i, v := range nums {
		if i == skip || v == 0 {
			continue
		}
		prod *= int64(v)
		kept = true
	}
	if kept {
		return prod
	}
	return int64(nums[len(nums)-1])
}
