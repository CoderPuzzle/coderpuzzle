// Every operation lowers the total sum by exactly 1, and the elements
// only bound how many operations are even possible (sum in total),
// never the residue. So the cheapest reachable sum that is divisible
// by k is the largest multiple of k not exceeding the sum, and the
// answer is the distance down to it: sum % k.
func minOperations(nums []int, k int) int {
	total := int64(0)
	for _, v := range nums {
		total += int64(v)
	}
	return int(total % int64(k))
}
