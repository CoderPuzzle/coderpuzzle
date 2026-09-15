// Only parity matters. In any target alternating pattern the k-th even
// (in current order) must land on the k-th even slot — crossings among
// equal-parity elements never pay — and each adjacent swap moves
// exactly one even by one position, so a pattern's cost is the sum
// |even index - even slot| (the odds mirror the evens). Try both
// patterns; a pattern is feasible only when its even-slot count equals
// the even count, which also encodes the |evenCnt - oddCnt| > 1
// impossibility. Accumulate in int64: costs approach n^2/8 ~ 1.25e9.
func minSwaps(nums []int) int64 {
	n := len(nums)
	evenSlots := (n + 1) / 2
	oddSlots := n / 2
	var best int64 = -1
	for start := 0; start <= 1; start++ {
		slots := evenSlots
		if start == 1 {
			slots = oddSlots
		}
		if slots != countEven(nums) {
			continue
		}
		var cost int64
		j := 0
		for i, v := range nums {
			if v%2 == 0 {
				p := int64(start + 2*j)
				d := int64(i) - p
				if d < 0 {
					d = -d
				}
				cost += d
				j++
			}
		}
		if best < 0 || cost < best {
			best = cost
		}
	}
	return best
}

func countEven(nums []int) int {
	c := 0
	for _, v := range nums {
		if v%2 == 0 {
			c++
		}
	}
	return c
}
