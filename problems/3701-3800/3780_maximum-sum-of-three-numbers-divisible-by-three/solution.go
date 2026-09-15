import "sort"

// Group values by remainder mod 3 and keep the three largest of each group
// -- no valid triplet ever needs a group's fourth-largest value. The only
// remainder patterns summing to 0 mod 3 are 000, 111, 222, and 012, so at
// most nine values decide everything; the answer is at most 3 * 10^5,
// safely inside 32 bits. If no pattern is achievable the answer stays 0.
func maximumSum(nums []int) int {
	top := make([][]int, 3)
	for _, v := range nums {
		r := v % 3
		top[r] = append(top[r], v)
	}
	for r := 0; r < 3; r++ {
		sort.Slice(top[r], func(i, j int) bool { return top[r][i] > top[r][j] })
		if len(top[r]) > 3 {
			top[r] = top[r][:3]
		}
	}
	take := func(r, k int) int {
		group := top[r]
		if len(group) < k {
			return -1
		}
		total := 0
		for i := 0; i < k; i++ {
			total += group[i]
		}
		return total
	}
	best := 0
	for r := 0; r < 3; r++ {
		if total := take(r, 3); total > best {
			best = total
		}
	}
	a, b, c := take(0, 1), take(1, 1), take(2, 1)
	if a >= 0 && b >= 0 && c >= 0 && a+b+c > best {
		best = a + b + c
	}
	return best
}
