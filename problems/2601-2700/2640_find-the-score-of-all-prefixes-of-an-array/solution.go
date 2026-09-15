func findPrefixScore(nums []int) []int64 {
	// ans is the prefix sum of the conversion array, so one fused pass keeps
	// a running max and a running total, never storing conver itself.
	// Conversion values reach 2*10^9 and totals 2*10^14, both past int
	// range, so everything accumulates in int64.
	result := make([]int64, len(nums))
	var runningMax, total int64
	for i, value := range nums {
		v := int64(value)
		if v > runningMax {
			runningMax = v
		}
		total += v + runningMax
		result[i] = total
	}
	return result
}
