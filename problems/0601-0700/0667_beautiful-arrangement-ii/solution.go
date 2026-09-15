// The first k+1 slots alternate between the two ends of 1..k+1 — 1, k+1,
// 2, k, 3, k-1, ... — so their adjacent differences walk down k, k-1, ...,
// 1, each distinct value exactly once. The values k+2..n then follow in
// ascending order: the junction difference falls back inside 1..k and every
// later difference is 1, so the k values already seen are the final count.
func constructArray(n int, k int) []int {
	answer := make([]int, 0, n)
	low, high := 1, k+1
	for i := 0; i <= k; i++ {
		if i%2 == 0 {
			answer = append(answer, low)
			low++
		} else {
			answer = append(answer, high)
			high--
		}
	}
	for v := k + 2; v <= n; v++ {
		answer = append(answer, v)
	}
	return answer
}
