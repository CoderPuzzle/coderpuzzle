import "sort"

func minOperations(nums []int, queries []int) []int64 {
	sorted := append([]int(nil), nums...)
	sort.Ints(sorted)
	n := len(sorted)
	prefix := make([]int64, n+1)
	for i, x := range sorted {
		prefix[i+1] = prefix[i] + int64(x)
	}
	out := make([]int64, 0, len(queries))
	for _, q := range queries {
		// Each query is the sum of |nums[i] - q|; sorted prefix sums make it
		// one binary search plus O(1) arithmetic. j counts elements strictly
		// below q (ties land right but contribute zero either way): smaller
		// ones are raised to q, the rest are lowered.
		j := sort.SearchInts(sorted, q)
		left := int64(q)*int64(j) - prefix[j]
		right := (prefix[n] - prefix[j]) - int64(q)*int64(n-j)
		out = append(out, left+right)
	}
	return out
}
