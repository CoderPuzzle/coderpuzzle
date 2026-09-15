// Compare diagonals through their squares (l^2 + w^2): squares order
// diagonals identically and stay exact in integers, so no square roots or
// float rounding anywhere. Ties on the diagonal fall through to the larger
// area.
func areaOfMaxDiagonal(dimensions [][]int) int {
	bestDiag, bestArea := 0, 0
	for _, rect := range dimensions {
		diag := rect[0]*rect[0] + rect[1]*rect[1]
		area := rect[0] * rect[1]
		if diag > bestDiag || (diag == bestDiag && area > bestArea) {
			bestDiag, bestArea = diag, area
		}
	}
	return bestArea
}
