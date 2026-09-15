// Three consecutive integers x-1, x, x+1 sum to exactly 3x, so a triple
// exists iff num is a multiple of 3. num reaches 10^15, which needs int64.
func sumOfThree(num int64) []int64 {
	if num%3 != 0 {
		return []int64{}
	}
	mid := num / 3
	return []int64{mid - 1, mid, mid + 1}
}
