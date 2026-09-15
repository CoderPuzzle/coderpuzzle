// maxSum pours each bit position's fixed copy pool into the k kept slots,
// highest bit first, then sums the slot squares modulo 1e9 + 7.
func maxSum(nums []int, k int) int {
	const mod = 1000000007

	// The operation replaces a pair with (a AND b, a OR b): the AND keeps
	// exactly the bits both values shared and the OR keeps exactly the bits
	// either had, so every bit position owns a fixed pool of count[b]
	// copies that operations merely reshuffle across the array.
	count := make([]int, 30)
	for _, x := range nums {
		for b := 0; b < 30; b++ {
			if x>>b&1 == 1 {
				count[b]++
			}
		}
	}

	// Pour the pools into the k kept slots greedily, highest bit first: a
	// set bit raises a larger running value's square by more, so the
	// biggest slots take every bit first. Slot i then holds bit b exactly
	// when i sits below count[b], so one sweep from the OR of all present
	// bits - dropping bit b as the sweep passes index count[b] - walks the
	// final slot values directly.
	drop := make([]int, k)
	value := 0
	for b := 0; b < 30; b++ {
		if count[b] > 0 {
			value |= 1 << b
			if count[b] < k {
				drop[count[b]] |= 1 << b
			}
		}
	}

	var total int64
	for i := 0; i < k; i++ {
		if i > 0 {
			value ^= drop[i]
		}
		// Slots stay below 2^30 but their squares reach ~1.15e18, so the
		// 64-bit product is reduced modulo 1e9 + 7 as the total accumulates.
		total = (total + int64(value)*int64(value)) % mod
	}
	return int(total)
}
