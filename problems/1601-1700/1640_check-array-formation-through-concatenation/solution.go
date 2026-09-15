// Every value across pieces is distinct, so a piece is uniquely
// identified by its first element. Map that value to the piece,
// then walk arr and match pieces to consecutive slices.
func canFormArray(arr []int, pieces [][]int) bool {
	first := make(map[int][]int, len(pieces))
	for _, piece := range pieces {
		first[piece[0]] = piece
	}

	index := 0
	for index < len(arr) {
		piece, ok := first[arr[index]]
		if !ok || index+len(piece) > len(arr) {
			return false
		}
		for offset, value := range piece {
			if arr[index+offset] != value {
				return false
			}
		}
		index += len(piece)
	}
	return true
}
