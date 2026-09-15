func maxSubarraySum(nums []int) int64 {
	n := len(nums)
	// Deleting the only element is forbidden, so its value stands.
	if n == 1 {
		return int64(nums[0])
	}
	// Per-candidate account: smallest adjusted prefix P(j) minus the |x|'s
	// deleted after j. Key 0 is the plain no-deletion prefix minimum.
	// prefixMap keyed by the deleted value; key 0 tracks min prefix sum.
	prefixMap := make(map[int]int64)
	prefixMap[0] = 0
	var prefixSum int64
	var minPrefix int64
	// Seeded with nums[0] so all-negative arrays need no zero sentinel.
	result := int64(nums[0])
	for _, num := range nums {
		prefixSum += int64(num)
		// Best subarray ending at r: P(r) minus the smallest adjusted prefix
		// seen so far. Runs before num joins any account, so every anchor
		// strictly precedes r and the subarray is never empty.
		if prefixSum-minPrefix > result {
			result = prefixSum - minPrefix
		}
		// Only a negative x can help: deleting a positive would only
		// shrink every subarray sum.
		if num < 0 {
			// Anchor at min(old account, plain prefix min) and subtract |x|
			// again: the deletion window may restart at this occurrence.
			p0 := prefixMap[0]
			var val int64
			if prev, ok := prefixMap[num]; ok {
				if p0 < prev {
					val = p0 + int64(num)
				} else {
					val = prev + int64(num)
				}
			} else {
				val = p0 + int64(num)
			}
			prefixMap[num] = val
			if val < minPrefix {
				minPrefix = val
			}
		}
		if prefixSum < prefixMap[0] {
			prefixMap[0] = prefixSum
		}
		if prefixMap[0] < minPrefix {
			minPrefix = prefixMap[0]
		}
	}
	return result
}
