// Only the first and last sectors of the whole marathon matter: every full
// lap around the track visits every sector once, so the total visit count
// only differs on the final, partial lap. That partial lap is exactly the
// arc from rounds[0] to rounds[len(rounds)-1].
func mostVisited(n int, rounds []int) []int {
	start, end := rounds[0], rounds[len(rounds)-1]
	result := []int{}
	if start <= end {
		for sector := start; sector <= end; sector++ {
			result = append(result, sector)
		}
		return result
	}
	// The arc wraps past sector n back to sector 1.
	for sector := 1; sector <= end; sector++ {
		result = append(result, sector)
	}
	for sector := start; sector <= n; sector++ {
		result = append(result, sector)
	}
	return result
}
