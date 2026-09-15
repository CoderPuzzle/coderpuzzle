import "sort"

func sortableIntegers(nums []int) int {
	n := len(nums)
	ordered := append([]int(nil), nums...)
	sort.Ints(ordered)
	total := 0
	for k := 1; k <= n; k++ {
		if n%k != 0 {
			continue
		}
		ok := true
		for start := 0; start < n; start += k {
			if !isRotation(nums[start:start+k], ordered[start:start+k]) {
				ok = false
				break
			}
		}
		if ok {
			total += k
		}
	}
	return total
}

// A sequence is a cyclic rotation of the block exactly when it appears
// inside `block + block`; a KMP scan answers that in O(k).
func isRotation(block, target []int) bool {
	k := len(block)
	text := make([]int, 2*k)
	copy(text, block)
	copy(text[k:], block)
	pi := make([]int, k)
	for i := 1; i < k; i++ {
		j := pi[i-1]
		for j > 0 && target[i] != target[j] {
			j = pi[j-1]
		}
		if target[i] == target[j] {
			j++
		}
		pi[i] = j
	}
	j := 0
	for _, value := range text {
		for j > 0 && value != target[j] {
			j = pi[j-1]
		}
		if value == target[j] {
			j++
		}
		if j == k {
			return true
		}
	}
	return false
}
