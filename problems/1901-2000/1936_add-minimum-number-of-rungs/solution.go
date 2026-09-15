// Greedy: bridge each gap with as few rungs as possible, placing each new
// rung as high as the current position allows. A gap of g between two
// heights needs ceil(g / dist) - 1 extra rungs.
func addRungs(rungs []int, dist int) int {
	added := 0
	current := 0
	for _, height := range rungs {
		gap := height - current
		added += (gap - 1) / dist
		current = height
	}
	return added
}
