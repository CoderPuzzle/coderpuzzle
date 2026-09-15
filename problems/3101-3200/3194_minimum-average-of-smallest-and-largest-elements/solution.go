import (
	"math"
	"sort"
)

// Every round pairs the current minimum with the current maximum; after
// sorting, those are exactly nums[k] and nums[n-1-k]. Sums stay <= 100
// and the single division by 2 is exact because every pair sum of
// integers in 1..50 yields an integer or an exact half in float64.
func minimumAverage(nums []int) float64 {
	sort.Ints(nums)
	best := math.MaxFloat64
	for k := 0; k*2 < len(nums); k++ {
		if avg := float64(nums[k]+nums[len(nums)-1-k]) / 2; avg < best {
			best = avg
		}
	}
	return best
}
