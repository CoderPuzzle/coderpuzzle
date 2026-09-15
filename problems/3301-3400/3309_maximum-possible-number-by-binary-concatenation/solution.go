import "math/bits"

// Only 3! = 6 orders exist, so try each one exhaustively. Combining is
// arithmetic: shift the accumulator left by the number's bit width and OR
// the number into the freed bits. Three 7-bit values concatenate to at most
// 21 bits, well inside int.
func maxGoodNumber(nums []int) int {
	best := 0
	orders := [6][3]int{
		{nums[0], nums[1], nums[2]}, {nums[0], nums[2], nums[1]},
		{nums[1], nums[0], nums[2]}, {nums[1], nums[2], nums[0]},
		{nums[2], nums[0], nums[1]}, {nums[2], nums[1], nums[0]},
	}
	for _, order := range orders {
		value := 0
		for _, x := range order {
			width := bits.Len(uint(x))
			value = (value << width) | x
		}
		if value > best {
			best = value
		}
	}
	return best
}
