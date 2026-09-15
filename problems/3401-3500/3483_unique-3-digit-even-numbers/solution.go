// Tally the digit supply once, then walk the 450 candidate numbers
// (hundreds 1-9, tens 0-9, even units) and keep those whose digit multiset
// fits the supply.
func totalNumbers(digits []int) int {
	var counts [10]int
	for _, d := range digits {
		counts[d]++
	}
	total := 0
	for h := 1; h <= 9; h++ {
		for t := 0; t <= 9; t++ {
			for _, u := range []int{0, 2, 4, 6, 8} {
				var need [10]int
				need[h]++
				need[t]++
				need[u]++
				fits := true
				for v := 0; v < 10; v++ {
					fits = fits && need[v] <= counts[v]
				}
				if fits {
					total++
				}
			}
		}
	}
	return total
}
