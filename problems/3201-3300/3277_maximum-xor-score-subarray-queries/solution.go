// One round of the score process turns an array into its adjacent XORs,
// so unrolling the rounds gives a Pascal-style recurrence over GF(2):
// score[l][r] = score[l][r-1] ^ score[l+1][r], seeded by the singleton
// subarrays — binomial coefficients mod 2 decide which elements reach the
// final XOR. On top of the score rows we fold a running maximum:
// best[l][r], the largest score of any subarray inside [l..r], splits by
// endpoints into max(score[l][r], best[l][r-1], best[l+1][r]) — any such
// subarray either drops the left end, drops the right end, or is [l..r]
// itself. Rows are built for l = n-1 down to 0, keeping only the previous
// score row while every finished best row is stored, so a query is one
// lookup into its left endpoint's row: O(n^2 + q) time and O(n^2) stored
// cells (~8 MB of int32 cells at n=2000). Every element is at most
// 2^31 - 1, so bit 31 is always 0, and the XOR of two bit-31-zero words
// has bit 31 zero too — by induction every score lies in [0, 2^31 - 1],
// so int32 storage never overflows.
func maximumSubarrayXor(nums []int, queries [][]int) []int {
	n := len(nums)
	bestRows := make([][]int32, n)
	var prevScore, prevBest []int32
	for left := n - 1; left >= 0; left-- {
		width := n - left
		curScore := make([]int32, width)
		curBest := make([]int32, width)
		curScore[0], curBest[0] = int32(nums[left]), int32(nums[left])
		for j := 1; j < width; j++ {
			s := curScore[j-1] ^ prevScore[j-1]
			curScore[j] = s
			curBest[j] = max(s, max(curBest[j-1], prevBest[j-1]))
		}
		bestRows[left] = curBest
		prevScore, prevBest = curScore, curBest
	}
	answer := make([]int, len(queries))
	for i, query := range queries {
		answer[i] = int(bestRows[query[0]][query[1]-query[0]])
	}
	return answer
}
