func countLatticePoints(circles [][]int) int {
	type point struct{ x, y int }
	seen := make(map[point]bool)
	for _, circle := range circles {
		x, y, r := circle[0], circle[1], circle[2]
		for px := x - r; px <= x+r; px++ {
			for py := y - r; py <= y+r; py++ {
				dx, dy := px-x, py-y
				if dx*dx+dy*dy <= r*r {
					seen[point{px, py}] = true
				}
			}
		}
	}
	return len(seen)
}
