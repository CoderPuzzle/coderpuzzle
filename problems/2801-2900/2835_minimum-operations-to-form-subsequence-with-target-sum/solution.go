import "math/bits"

func minOperations(nums []int, target int) int {
	// Bucket elements by their power-of-two exponent. Element sums reach
	// 1000 * 2^30, which overflows int on narrow platforms: keep the running
	// total in int64.
	count := make([]int64, 62)
	var total int64
	for _, num := range nums {
		count[bits.Len32(uint32(num))-1]++
		total += int64(num)
	}
	// Every operation preserves the array sum, so a subsequence can never
	// exceed it.
	if total < int64(target) {
		return -1
	}
	var operations int64
	for bit := 0; bit <= 30; bit++ {
		if target>>bit&1 != 0 {
			if count[bit] > 0 {
				count[bit]--
			} else {
				source := bit + 1
				for count[source] == 0 {
					source++
				}
				// Unreachable given the total check; a defensive stop.
				if source > 60 {
					return -1
				}
				operations += int64(source - bit)
				count[source]--
				// The split chain banks one spare twin at every passed level
				// and its own twin right at the needed level.
				for spare := bit + 1; spare < source; spare++ {
					count[spare]++
				}
				count[bit]++
			}
		}
		// Leftover pairs at this level stand in for the element one level up,
		// so they feed the next iteration for free.
		count[bit+1] += count[bit] / 2
	}
	return int(operations)
}
