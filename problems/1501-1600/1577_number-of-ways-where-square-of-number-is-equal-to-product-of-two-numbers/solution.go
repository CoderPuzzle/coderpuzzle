import "sort"

func numTriplets(nums1 []int, nums2 []int) int {
	return int(countType(nums1, nums2) + countType(nums2, nums1))
}

// countType counts index pairs (j, k), j < k, in b whose product equals
// some a[i]^2, summed over every i in a.
func countType(a []int, b []int) int64 {
	freq := make(map[int64]int64)
	for _, v := range b {
		freq[int64(v)]++
	}
	distinct := make([]int64, 0, len(freq))
	for v := range freq {
		distinct = append(distinct, v)
	}
	sort.Slice(distinct, func(i, j int) bool { return distinct[i] < distinct[j] })

	var total int64 = 0
	for _, x := range a {
		// Squares reach up to (1e5)^2 = 1e10, outside int32 range.
		target := int64(x) * int64(x)
		for _, v := range distinct {
			if v*v > target {
				break
			}
			if target%v != 0 {
				continue
			}
			other := target / v
			if other == v {
				c := freq[v]
				total += c * (c - 1) / 2
			} else if c, ok := freq[other]; ok {
				total += freq[v] * c
			}
		}
	}
	return total
}
