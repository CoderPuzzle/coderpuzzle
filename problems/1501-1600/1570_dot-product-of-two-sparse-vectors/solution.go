// A sparse vector keeps only its nonzero (index, value) pairs — the
// indices arrive in increasing order by construction — so a vector of
// length 1e5 with three nonzero entries stores three pairs. The dot
// product then merges the two sorted pair lists with two cursors: equal
// indices contribute one product and advance both cursors, a smaller
// index advances alone because its partner there is zero. The bound
// 1e5 * 100 * 100 = 1e9 still fits an int.
type SparseVector struct {
	pairs [][2]int
}

func NewSparseVectorTyped(nums []int) *SparseVector {
	pairs := make([][2]int, 0, len(nums))
	for index, value := range nums {
		if value != 0 {
			pairs = append(pairs, [2]int{index, value})
		}
	}
	return &SparseVector{pairs: pairs}
}

func (design *SparseVector) dotProduct(vec *SparseVector) int {
	total := 0
	left := 0
	right := 0
	for left < len(design.pairs) && right < len(vec.pairs) {
		switch {
		case design.pairs[left][0] == vec.pairs[right][0]:
			total += design.pairs[left][1] * vec.pairs[right][1]
			left++
			right++
		case design.pairs[left][0] < vec.pairs[right][0]:
			left++
		default:
			right++
		}
	}
	return total
}
