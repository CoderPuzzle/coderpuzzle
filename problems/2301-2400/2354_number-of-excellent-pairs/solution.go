import "math/bits"

func countExcellentPairs(nums []int, k int) int64 {
	// identity: popcount(a|b)+popcount(a&b) = popcount(a)+popcount(b), so only
	// the individual bit counts matter; dedupe: pairs use distinct values
	unique := make(map[int]struct{})
	for _, x := range nums {
		unique[x] = struct{}{}
	}
	// bucket distinct values by their set-bit count
	var counts [64]int64
	for x := range unique {
		counts[bits.OnesCount(uint(x))]++
	}
	var answer int64
	// ordered bucket pairs: c1*c2 covers (a,b) and (b,a), plus (a,a) once
	for b1 := 0; b1 < 64; b1++ {
		if counts[b1] == 0 {
			continue
		}
		for b2 := 0; b2 < 64; b2++ {
			if b1+b2 >= k {
				answer += counts[b1] * counts[b2]
			}
		}
	}
	return answer
}
