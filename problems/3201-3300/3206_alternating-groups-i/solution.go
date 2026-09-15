// A 3-tile window centered on tile i alternates exactly when both of i's
// circular neighbors differ from it, so count the tiles whose previous and
// next tiles (wrapping around) hold the opposite color.
func numberOfAlternatingGroups(colors []int) int {
	n := len(colors)
	count := 0
	for i := 0; i < n; i++ {
		if prev, next := colors[(i+n-1)%n], colors[(i+1)%n]; prev != colors[i] && colors[i] != next {
			count++
		}
	}
	return count
}
