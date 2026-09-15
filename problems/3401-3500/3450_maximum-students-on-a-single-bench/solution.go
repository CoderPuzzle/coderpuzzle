// Mark (bench, student) pairs in a fixed grid; the first sight of a pair is
// the only one that bumps its bench's unique count.
func maxStudentsOnBench(students [][]int) int {
	var seen [101][101]bool
	var count [101]int
	for _, entry := range students {
		if !seen[entry[1]][entry[0]] {
			seen[entry[1]][entry[0]] = true
			count[entry[1]]++
		}
	}
	best := 0
	for bench := 1; bench <= 100; bench++ {
		if count[bench] > best {
			best = count[bench]
		}
	}
	return best
}
