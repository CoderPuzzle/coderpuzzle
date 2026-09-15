// Track the running champion and its win streak in a single left-to-right
// pass; this reproduces the same sequence of wins the literal
// move-loser-to-the-back simulation would produce.
func getWinner(arr []int, k int) int {
	champion := arr[0]
	streak := 0
	for i := 1; i < len(arr); i++ {
		if arr[i] > champion {
			champion = arr[i]
			streak = 1
		} else {
			streak++
		}
		if streak >= k {
			return champion
		}
	}
	return champion
}
