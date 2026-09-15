// Read in increasing order, any replacement becomes a merge of the two
// arrays; replaying a merge hands each slot the smallest value above its
// predecessor with the slot's parity, so a step adds 1 when the bit
// differs from the previous bit and 2 when it repeats. dp[i][j][f] is the
// replay minimum after consuming i slots of nums1 and j of nums2 with the
// last value taken by array f; two rolling rows carry the table. Answers
// are <= 2*(n+m) <= 4000, so BIG sentinel arithmetic stays safe.
func minLargest(nums1 []int, nums2 []int) int {
	const BIG = 1 << 29
	n, m := len(nums1), len(nums2)
	prv0 := make([]int, m+1)
	prv1 := make([]int, m+1)
	for j := range prv0 {
		prv0[j] = BIG
		prv1[j] = BIG
	}
	if m >= 1 {
		prv1[1] = 2 - nums2[0]
		for j := 2; j <= m; j++ {
			step := 1
			if nums2[j-2] == nums2[j-1] {
				step = 2
			}
			prv1[j] = prv1[j-1] + step
		}
	}
	for i := 1; i <= n; i++ {
		x := nums1[i-1]
		stepX := 2
		if i >= 2 && nums1[i-2] != x {
			stepX = 1
		}
		cur0 := make([]int, m+1)
		cur1 := make([]int, m+1)
		for j := range cur0 {
			cur0[j] = BIG
			cur1[j] = BIG
		}
		if i == 1 {
			cur0[0] = 2 - x
		} else {
			cur0[0] = prv0[0] + stepX
		}
		for j := 1; j <= m; j++ {
			y := nums2[j-1]
			a := prv0[j] + stepX
			b := prv1[j] + 2
			if y != x {
				b = prv1[j] + 1
			}
			if b < a {
				a = b
			}
			cur0[j] = a
			best := cur0[j-1] + 2
			if x != y {
				best = cur0[j-1] + 1
			}
			if j >= 2 {
				cand := cur1[j-1] + 2
				if nums2[j-2] != y {
					cand = cur1[j-1] + 1
				}
				if cand < best {
					best = cand
				}
			}
			cur1[j] = best
		}
		prv0, prv1 = cur0, cur1
	}
	return min(prv0[m], prv1[m])
}
