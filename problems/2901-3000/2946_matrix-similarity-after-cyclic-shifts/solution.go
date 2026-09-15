// After k steps an even row is its original left-rotated by k and an odd
// row its original right-rotated by k, both mod the row length. A row is
// invariant under rotation by d exactly when it is invariant under -d, so
// one modular comparison per cell settles both parities and no
// intermediate matrices are built.
func areSimilar(mat [][]int, k int) bool {
	n := len(mat[0])
	d := k % n
	if d == 0 {
		return true
	}
	for _, row := range mat {
		for j := 0; j < n; j++ {
			if row[j] != row[(j+d)%n] {
				return false
			}
		}
	}
	return true
}
