// Two caps compete: Alice eats at most n / 2 candies, and there are only as
// many types as distinct values. Each eaten candy can be a new type until
// the types or the allowance runs out, so the answer is the smaller of the
// distinct count and half the length.
func distributeCandies(candyType []int) int {
	types := make(map[int]bool, len(candyType))
	for _, candy := range candyType {
		types[candy] = true
	}
	return min(len(types), len(candyType)/2)
}
