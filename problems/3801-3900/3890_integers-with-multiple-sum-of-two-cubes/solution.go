import "sort"

func findGoodIntegers(n int) []int {
	// The largest possible base is the integer cube root of n <= 10^9,
	// which is at most 1000.
	limit := 0
	for (limit+1)*(limit+1)*(limit+1) <= n {
		limit++
	}
	cubes := make([]int64, limit+1)
	for i := 1; i <= limit; i++ {
		cubes[i] = int64(i) * int64(i) * int64(i)
	}
	counts := make(map[int64]int)
	for a := 1; a <= limit; a++ {
		if cubes[a]+cubes[a] > int64(n) {
			break
		}
		for b := a; b <= limit; b++ {
			total := cubes[a] + cubes[b]
			if total > int64(n) {
				break
			}
			counts[total]++
		}
	}
	// A value is good when at least two distinct pairs form it.
	result := []int{}
	for s, c := range counts {
		if c >= 2 {
			result = append(result, int(s))
		}
	}
	sort.Ints(result)
	return result
}
