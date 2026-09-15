const mod = 1_000_000_007

// Running sums of each array since the last crossing point, kept in int64:
// with n up to 1e5 and values up to 1e7, an unreduced segment sum can reach
// roughly 1e12.
func maxSum(nums1 []int, nums2 []int) int {
	i, j := 0, 0
	n1, n2 := len(nums1), len(nums2)
	var sum1, sum2 int64 = 0, 0
	var result int64 = 0
	for i < n1 && j < n2 {
		if nums1[i] < nums2[j] {
			sum1 += int64(nums1[i])
			i++
		} else if nums1[i] > nums2[j] {
			sum2 += int64(nums2[j])
			j++
		} else {
			// Crossing point: lock in the better of the two segments, plus
			// the shared value itself (counted once), then reset.
			best := sum1
			if sum2 > best {
				best = sum2
			}
			result += best + int64(nums1[i])
			sum1, sum2 = 0, 0
			i++
			j++
		}
	}
	// Drain whichever array still has a tail; no more crossings are
	// possible once one array is exhausted.
	for i < n1 {
		sum1 += int64(nums1[i])
		i++
	}
	for j < n2 {
		sum2 += int64(nums2[j])
		j++
	}
	best := sum1
	if sum2 > best {
		best = sum2
	}
	result += best
	return int(result % mod)
}
