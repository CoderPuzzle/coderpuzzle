import "math/bits"

func minOperations(nums []int) []int {
	// A binary palindrome is completely determined by its first half of
	// bits: mirror that half around the middle and the whole string is
	// fixed. So every candidate nearest palindrome is one of: the mirrors
	// of the value's own first half and the halves one step below/above
	// it, plus the two length-boundary forms.
	mirror := func(head, halfLen, length int) int {
		// Build the full palindrome from its first half of bits: emit the
		// half MSB-first, then append the mirrored tail — every bit except
		// the shared center for odd lengths (bit 0 of the half), all bits
		// for even lengths.
		full := 0
		for i := halfLen - 1; i >= 0; i-- {
			full = full*2 + (head>>i)&1
		}
		start := 0
		if length%2 == 1 {
			start = 1
		}
		for i := start; i < halfLen; i++ {
			full = full*2 + (head>>i)&1
		}
		return full
	}
	answer := make([]int, len(nums))
	for i, value := range nums {
		length := bits.Len(uint(value))
		halfLen := (length + 1) / 2
		head := value >> (length - halfLen)
		best := -1
		for _, h := range [3]int{head - 1, head, head + 1} {
			if h>>(halfLen-1) == 0 {
				continue // would lose its leading one — not a b-bit head
			}
			d := value - mirror(h, halfLen, length)
			if d < 0 {
				d = -d
			}
			if best < 0 || d < best {
				best = d
			}
		}
		for _, boundary := range [2]int{(1 << (length - 1)) - 1, (1 << length) + 1} {
			d := value - boundary
			if d < 0 {
				d = -d
			}
			if d < best {
				best = d
			}
		}
		answer[i] = best
	}
	return answer
}
