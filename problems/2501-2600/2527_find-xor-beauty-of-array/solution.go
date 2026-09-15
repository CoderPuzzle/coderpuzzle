// Per bit position b, the XOR of ((nums[i] | nums[j]) & nums[k]) over
// all triples equals "how many nums have bit b set, mod 2": triples
// only flip bit b an odd number of times when an odd number of
// elements carry it. But that is exactly what folding XOR across the
// array computes in one linear pass — no triplets needed.
func xorBeauty(nums []int) int {
	beauty := 0
	for _, v := range nums {
		beauty ^= v
	}
	return beauty
}
