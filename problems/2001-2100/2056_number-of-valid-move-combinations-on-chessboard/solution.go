type chessMove struct {
	dr, dc, steps int
}

func countCombinations(pieces []string, positions [][]int) int {
	options := make([][]chessMove, len(pieces))
	for index, piece := range pieces {
		options[index] = chessMoves(piece, positions[index])
	}
	chosen := make([]chessMove, 0, len(pieces))
	var search func(int) int
	search = func(index int) int {
		if index == len(pieces) {
			return 1
		}
		total := 0
		for _, move := range options[index] {
			valid := true
			for other := 0; other < index && valid; other++ {
				valid = chessCompatible(index, move, other, chosen[other], positions)
			}
			if valid {
				chosen = append(chosen, move)
				total += search(index + 1)
				chosen = chosen[:len(chosen)-1]
			}
		}
		return total
	}
	return search(0)
}

func chessMoves(piece string, position []int) []chessMove {
	orthogonal := [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	diagonal := [][2]int{{1, 1}, {1, -1}, {-1, 1}, {-1, -1}}
	directions := make([][2]int, 0, 8)
	if piece != "bishop" {
		directions = append(directions, orthogonal...)
	}
	if piece != "rook" {
		directions = append(directions, diagonal...)
	}
	moves := []chessMove{{0, 0, 0}}
	for _, direction := range directions {
		for steps := 1; ; steps++ {
			row := position[0] + direction[0]*steps
			column := position[1] + direction[1]*steps
			if row < 1 || row > 8 || column < 1 || column > 8 {
				break
			}
			moves = append(moves, chessMove{direction[0], direction[1], steps})
		}
	}
	return moves
}

func chessCompatible(index int, move chessMove, other int, otherMove chessMove, positions [][]int) bool {
	for second := 0; second <= 7; second++ {
		row := positions[index][0] + move.dr*minChess(second, move.steps)
		column := positions[index][1] + move.dc*minChess(second, move.steps)
		otherRow := positions[other][0] + otherMove.dr*minChess(second, otherMove.steps)
		otherColumn := positions[other][1] + otherMove.dc*minChess(second, otherMove.steps)
		if row == otherRow && column == otherColumn {
			return false
		}
	}
	return true
}

func minChess(left, right int) int {
	if left < right {
		return left
	}
	return right
}
