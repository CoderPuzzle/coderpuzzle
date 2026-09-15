import "sort"

func checkArithmeticSubarrays(nums []int, l []int, r []int) []bool {
	answer := make([]bool, len(l))
	for qi := range l {
		// A set of numbers can be rearranged into an arithmetic sequence
		// exactly when its sorted order already is one.
		sub := append([]int(nil), nums[l[qi]:r[qi]+1]...)
		sort.Ints(sub)
		diff := sub[1] - sub[0]
		ok := true
		for i := 2; i < len(sub); i++ {
			if sub[i]-sub[i-1] != diff {
				ok = false
				break
			}
		}
		answer[qi] = ok
	}
	return answer
}
