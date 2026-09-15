// With values capped at 100, a value is either present in a range or
// not, and 100 prefix-count rows decide that in O(1): row v holds the
// occurrence count of v over every prefix of nums, so v appears in
// nums[l..r] exactly when its count rises between l and r+1. A query
// then walks the value axis 1..100, collects the values whose counts
// rise, and takes the smallest gap between consecutive ones — present
// values arrive in increasing order, and the minimum |a[i] - a[j]| over
// a set always sits between value-adjacent elements. Fewer than two
// rising rows means every element in the range matches, so the answer
// is -1; with two or more the gap is at most 99, which is what makes
// the untouched sentinel honest. The flat 100 x (n+1) int32 slice is
// ~40 MB — inside the memory budget — and every count fits 32-bit by
// construction.
func minDifference(nums []int, queries [][]int) []int {
	n := len(nums)
	// pre[v*(n+1)+i] = occurrences of value v in nums[0..i)
	pre := make([]int32, 101*(n+1))
	for v := 1; v <= 100; v++ {
		base := v * (n + 1)
		run := int32(0)
		for i := 0; i < n; i++ {
			if nums[i] == v {
				run++
			}
			pre[base+i+1] = run
		}
	}
	answer := make([]int, len(queries))
	for q, query := range queries {
		l, r1 := query[0], query[1]+1
		prev := -1
		best := 100
		for v := 1; v <= 100; v++ {
			base := v * (n + 1)
			if pre[base+r1] != pre[base+l] {
				if prev >= 0 && v-prev < best {
					best = v - prev
				}
				prev = v
			}
		}
		if best < 100 {
			answer[q] = best
		} else {
			answer[q] = -1
		}
	}
	return answer
}
