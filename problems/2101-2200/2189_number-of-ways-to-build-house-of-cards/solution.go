// Rows shrink going up; a row of k triangles costs 3k - 1 cards. Count
// row sequences with a memo keyed on (cards left, largest row allowed
// above).
func houseOfCards(n int) int {
	memo := make([][]int, n+1)
	for i := range memo {
		memo[i] = make([]int, n+2)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var count func(remaining, allowed int) int
	count = func(remaining, allowed int) int {
		if memo[remaining][allowed] >= 0 {
			return memo[remaining][allowed]
		}
		total := 0
		for k := 1; k <= allowed && 3*k-1 <= remaining; k++ {
			used := 3*k - 1
			if used == remaining {
				total++
			} else {
				total += count(remaining-used, k-1)
			}
		}
		total %= 1000000007
		memo[remaining][allowed] = total
		return total
	}
	return count(n, n)
}
