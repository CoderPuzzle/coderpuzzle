func numTeams(rating []int) int {
	// Fix the middle soldier j: a rising team picks any smaller rating on
	// the left and any larger on the right; a falling team mirrors it.
	// Summing the four counts over every j counts each triple exactly
	// once, by its middle element.
	n := len(rating)
	teams := 0
	for j := 0; j < n; j++ {
		lessLeft := 0
		for i := 0; i < j; i++ {
			if rating[i] < rating[j] {
				lessLeft++
			}
		}
		greaterLeft := j - lessLeft
		greaterRight := 0
		for k := j + 1; k < n; k++ {
			if rating[k] > rating[j] {
				greaterRight++
			}
		}
		lessRight := n - 1 - j - greaterRight
		teams += lessLeft*greaterRight + greaterLeft*lessRight
	}
	return teams
}
