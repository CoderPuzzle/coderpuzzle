// Eight two-state cells admit at most 256 rows, and day one vacates both
// end cells, leaving 64 — the deterministic daily map must loop. Hash each
// row (as its 8-bit mask) to its first day; when the row reappears on day
// `day` after first being seen on day `first`, the future repeats that
// day - first cycle, so only (n - day) % cycle further transitions remain.
func prisonAfterNDays(cells []int, n int) []int {
	seen := make(map[int]int)
	state := mask(cells)
	day := 0
	for day < n {
		if _, ok := seen[state]; ok {
			break
		}
		seen[state] = day
		cells = nextDay(cells)
		state = mask(cells)
		day++
	}
	if day < n {
		cycle := day - seen[state]
		for i := 0; i < (n-day)%cycle; i++ {
			cells = nextDay(cells)
		}
	}
	return cells
}

func nextDay(cells []int) []int {
	next := make([]int, 8)
	for i := 1; i < 7; i++ {
		if cells[i-1] == cells[i+1] {
			next[i] = 1
		}
	}
	return next
}

func mask(cells []int) int {
	bits := 0
	for _, value := range cells {
		bits = bits<<1 | value
	}
	return bits
}
