// XOR is its own inverse: canceling arr[i] out of
// encoded[i] = arr[i] ^ arr[i+1] leaves
// arr[i+1] = encoded[i] ^ arr[i]. Seed with first and unroll
// the chain left to right — the running element is the only
// unknown in the next equation.
func decode(encoded []int, first int) []int {
	arr := make([]int, len(encoded)+1)
	arr[0] = first
	for i, value := range encoded {
		arr[i+1] = arr[i] ^ value
	}
	return arr
}
