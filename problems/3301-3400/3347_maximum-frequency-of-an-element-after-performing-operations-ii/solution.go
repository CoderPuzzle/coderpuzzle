import "sort"

// A target v collects every element in [v-k, v+k]: elements already equal
// to v cost nothing, any other costs one operation, and surplus operations
// can always be spent as +0 elsewhere because numOperations <= n. So the
// best frequency at v is min(window(v), count(v) + numOperations).
// Values reach 1e9, far too wide to sweep, so only breakpoints are tried:
// if the optimum falls off an element, its window's smallest element x can
// slide the target to x + k without losing anyone, so v = nums[i] and
// v = nums[i] + k always contain an optimum; nums[i] - k is the symmetric
// guard. Window bounds reach 3e9, past 32 bits, so the values are searched
// as int64.
func maxFrequency(nums []int, k int, numOperations int) int {
	sort.Ints(nums)
	vals := make([]int64, len(nums))
	for i, x := range nums {
		vals[i] = int64(x)
	}
	k64 := int64(k)
	lowerBound := func(limit int64) int {
		return sort.Search(len(vals), func(i int) bool { return vals[i] >= limit })
	}
	upperBound := func(limit int64) int {
		return sort.Search(len(vals), func(i int) bool { return vals[i] > limit })
	}
	best := 0
	for _, x := range vals {
		for _, v := range [3]int64{x - k64, x, x + k64} {
			window := upperBound(v+k64) - lowerBound(v-k64)
			exact := upperBound(v) - lowerBound(v)
			best = max(best, min(window, exact+numOperations))
		}
	}
	return best
}
