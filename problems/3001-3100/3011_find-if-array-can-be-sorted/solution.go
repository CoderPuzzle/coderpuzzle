import "math/bits"

func canSortArray(nums []int) bool {
	previousMax := 0
	currentMax := 0
	currentBits := 0
	for _, value := range nums {
		bits := bits.OnesCount(uint(value))
		if bits != currentBits {
			previousMax = currentMax
			currentBits = bits
			currentMax = 0
		}
		if value < previousMax {
			return false
		}
		if value > currentMax {
			currentMax = value
		}
	}
	return true
}
