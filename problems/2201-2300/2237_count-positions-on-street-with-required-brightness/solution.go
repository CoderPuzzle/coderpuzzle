func meetRequirement(n int, lights [][]int, requirement []int) int {
	delta := make([]int, n+1)
	for _, light := range lights {
		position, rng := light[0], light[1]
		if position-rng > 0 {
			delta[position-rng]++
		} else {
			delta[0]++
		}
		if position+rng+1 < n {
			delta[position+rng+1]--
		} else {
			delta[n]--
		}
	}
	brightness := 0
	count := 0
	for i := 0; i < n; i++ {
		brightness += delta[i]
		if brightness >= requirement[i] {
			count++
		}
	}
	return count
}
