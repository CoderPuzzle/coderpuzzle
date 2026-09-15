// Each sign keeps its original relative order, so the k-th positive
// belongs at slot 2k and the k-th negative at 2k + 1 — one scatter pass
// places every element directly.
func rearrangeArray(nums []int) []int {
	result := make([]int, len(nums))
	positives, negatives := 0, 0
	for _, value := range nums {
		if value > 0 {
			result[2*positives] = value
			positives++
		} else {
			result[2*negatives+1] = value
			negatives++
		}
	}
	return result
}
