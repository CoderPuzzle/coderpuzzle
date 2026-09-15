// From every cell, march each of the eight directions straight to the matrix
// edge; a path is fully described by its start and direction.
func mostFrequentPrime(mat [][]int) int {
	directions := [8][2]int{
		{0, 1}, {1, 1}, {1, 0}, {1, -1},
		{0, -1}, {-1, -1}, {-1, 0}, {-1, 1},
	}
	counts := map[int]int{}
	for i := range mat {
		for j := range mat[0] {
			for _, d := range directions {
				value := mat[i][j]
				x, y := i+d[0], j+d[1]
				for x >= 0 && x < len(mat) && y >= 0 && y < len(mat[0]) {
					// Appending one digit materializes the number formed at
					// this step, so every step tallies on its own.
					value = value*10 + mat[x][y]
					if value > 10 && isPrime(value) {
						counts[value]++
					}
					x += d[0]
					y += d[1]
				}
			}
		}
	}
	// Highest frequency wins, ties toward the larger prime; no candidate at
	// all leaves the answer at -1.
	bestValue, bestCount := -1, 0
	for value, count := range counts {
		if count > bestCount || (count == bestCount && value > bestValue) {
			bestValue, bestCount = value, count
		}
	}
	return bestValue
}

func isPrime(value int) bool {
	if value%2 == 0 {
		return value == 2
	}
	for factor := 3; factor*factor <= value; factor += 2 {
		if value%factor == 0 {
			return false
		}
	}
	return true
}
