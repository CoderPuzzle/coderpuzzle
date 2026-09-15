// An odd total can never be a sum of even numbers. Take the smallest
// evens while the leftover allows a strictly larger final part.
// finalSum reaches 10^10, which needs int64.
func maximumEvenSplit(finalSum int64) []int64 {
	if finalSum%2 != 0 {
		return []int64{}
	}
	parts := []int64{}
	take := int64(2)
	remaining := finalSum
	for remaining-take > take {
		parts = append(parts, take)
		remaining -= take
		take += 2
	}
	return append(parts, remaining)
}
