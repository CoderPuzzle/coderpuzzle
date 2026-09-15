import "sort"

func maximumStrongPairXor(nums []int) int {
	// Sorted sweep with a sliding window [ceil(y/2), y]: one hash map
	// keyed on the values' bit prefixes (top bit down, each key carrying
	// a leading 1 bit that pins its length), each key counting how many
	// live window values pass through it, answers "best XOR partner of y
	// in the window" greedily. The left pointer retires values whose
	// doubling falls below y.
	sort.Ints(nums)
	const BITS = 20 // nums[i] <= 2^20 - 1
	prefixes := make(map[int]int)
	best := 0
	left := 0
	for _, y := range nums {
		// insert y: one key per prefix length, top bit down
		for b := BITS - 1; b >= 0; b-- {
			key := (1 << (BITS - b)) | (y >> b)
			prefixes[key]++
		}
		// retire x from the left while 2 * x < y
		for 2*nums[left] < y {
			x := nums[left]
			for b := BITS - 1; b >= 0; b-- {
				key := (1 << (BITS - b)) | (x >> b)
				if remaining := prefixes[key] - 1; remaining > 0 {
					prefixes[key] = remaining
				} else {
					delete(prefixes, key)
				}
			}
			left++
		}
		// query: prefer flipping y's bit while that prefix is live
		p := 1 // the leading 1 bit, then no value bits yet
		res := 0
		for b := BITS - 1; b >= 0; b-- {
			d := (y >> b) & 1
			want := (p << 1) | (d ^ 1)
			if _, ok := prefixes[want]; ok {
				res |= 1 << b
				p = want
			} else {
				p = (p << 1) | d
			}
		}
		best = max(best, res)
	}
	return best
}
