// Only tops[0] or bottoms[0] can ever fill a whole row, since the very
// first domino must already carry the value on one face. For a candidate
// value x, one pass decides whether every domino can show x on some
// face, and if so, the cheaper of "rotate x onto every top" vs "rotate x
// onto every bottom".
func minDominoRotations(tops []int, bottoms []int) int {
	check := func(x int) int {
		rotationsTop := 0
		rotationsBottom := 0
		for i := range tops {
			if tops[i] != x && bottoms[i] != x {
				return -1
			} else if tops[i] != x {
				rotationsTop++
			} else if bottoms[i] != x {
				rotationsBottom++
			}
		}
		if rotationsTop < rotationsBottom {
			return rotationsTop
		}
		return rotationsBottom
	}

	result := check(tops[0])
	if result != -1 || tops[0] == bottoms[0] {
		return result
	}
	return check(bottoms[0])
}
