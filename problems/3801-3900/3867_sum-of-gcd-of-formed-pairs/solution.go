import "sort"

// prefixGcd[i] is gcd(nums[i], running max so far). Once built, the sorted
// list is paired smallest-with-largest, and each pair's gcd is summed — a
// two-pointer walk from both ends. Widen to int64: the sum of up to 5e4
// gcds, each as large as 1e9, reaches ~5e13.
func gcdSum(nums []int) int64 {
	prefixGcd := make([]int64, 0, len(nums))
	var running int64
	for _, value := range nums {
		v := int64(value)
		if v > running {
			running = v
		}
		prefixGcd = append(prefixGcd, gcd(v, running))
	}
	sort.Slice(prefixGcd, func(i, j int) bool { return prefixGcd[i] < prefixGcd[j] })
	lo, hi := 0, len(prefixGcd)-1
	var total int64
	for lo < hi {
		total += gcd(prefixGcd[lo], prefixGcd[hi])
		lo++
		hi--
	}
	return total
}

func gcd(a, b int64) int64 {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
