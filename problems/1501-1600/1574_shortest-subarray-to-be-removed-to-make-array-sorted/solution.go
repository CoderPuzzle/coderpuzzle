// Two-pointer merge on the longest non-decreasing prefix and suffix.
func findLengthOfShortestSubarray(arr []int) int {
	n := len(arr)
	// Longest non-decreasing prefix: arr[0..left] is sorted.
	left := 0
	for left+1 < n && arr[left] <= arr[left+1] {
		left++
	}
	if left == n-1 {
		return 0
	}
	// Longest non-decreasing suffix: arr[right..n-1] is sorted.
	right := n - 1
	for right > 0 && arr[right-1] <= arr[right] {
		right--
	}
	// Removing everything after the prefix, or everything before the
	// suffix, are always valid — they bound the answer from the start.
	result := n - left - 1
	if right < result {
		result = right
	}
	// Two-pointer merge: i walks the sorted prefix, j walks the sorted
	// suffix. Both prefix and suffix are individually non-decreasing, so as
	// i advances the smallest valid j never decreases — a classic
	// merge-step invariant, giving O(left + (n - right)) total work.
	i, j := 0, right
	for i <= left && j < n {
		if arr[i] <= arr[j] {
			// Keeping arr[0..i] and arr[j..n-1] merges into a sorted array;
			// everything strictly between them is removed.
			if candidate := j - i - 1; candidate < result {
				result = candidate
			}
			i++
		} else {
			j++
		}
	}
	return result
}
