func numOfBurgers(tomatoSlices int, cheeseSlices int) []int {
	// Solve the system: 4J + 2S = tomatoes, J + S = cheese. Doubling the
	// cheese equation and subtracting isolates jumbo:
	// 2J = tomatoes - 2*cheese. The pair exists iff that value is a
	// non-negative even integer and the back-solved small count is
	// non-negative too.
	twoJumbo := tomatoSlices - 2*cheeseSlices
	if twoJumbo < 0 || twoJumbo%2 != 0 {
		return []int{}
	}
	jumbo := twoJumbo / 2
	small := cheeseSlices - jumbo
	if small < 0 {
		return []int{}
	}
	return []int{jumbo, small}
}
