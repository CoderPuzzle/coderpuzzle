func maxNumber(nums1 []int, nums2 []int, k int) []int {
	var best []int
	// Try every split of the k digits between the two arrays and keep the
	// best merged candidate; the answer is the max over all splits.
	for take1 := 0; take1 <= len(nums1); take1++ {
		take2 := k - take1
		if take2 < 0 || take2 > len(nums2) {
			continue
		}
		candidate := merge(maxSubsequence(nums1, take1), maxSubsequence(nums2, take2))
		if larger(candidate, best) {
			best = candidate
		}
	}
	return best
}

func maxSubsequence(nums []int, t int) []int {
	// Monotonic stack: while digits can still be dropped, pop any smaller
	// digit in front of a larger newcomer, then keep the first t digits.
	stack := make([]int, 0, len(nums))
	drop := len(nums) - t
	for _, num := range nums {
		for drop > 0 && len(stack) > 0 && stack[len(stack)-1] < num {
			stack = stack[:len(stack)-1]
			drop--
		}
		stack = append(stack, num)
	}
	return stack[:t]
}

func merge(a, b []int) []int {
	merged := make([]int, 0, len(a)+len(b))
	i, j := 0, 0
	for i < len(a) && j < len(b) {
		// Equal heads are decided by comparing the tails that follow.
		if greater(a, i, b, j) {
			merged = append(merged, a[i])
			i++
		} else {
			merged = append(merged, b[j])
			j++
		}
	}
	merged = append(merged, a[i:]...)
	merged = append(merged, b[j:]...)
	return merged
}

func greater(a []int, i int, b []int, j int) bool {
	// Is a[i:] the larger remaining sequence? Skip the equal prefix first;
	// whichever tail runs out (or holds the smaller digit) loses the tie.
	for i < len(a) && j < len(b) && a[i] == b[j] {
		i++
		j++
	}
	return j == len(b) || (i < len(a) && a[i] > b[j])
}

func larger(a, b []int) bool {
	// Fixed-length digit order: first differing position decides, and a
	// longer sequence beats the nil the first candidate compares against.
	for i := 0; i < len(a) && i < len(b); i++ {
		if a[i] != b[i] {
			return a[i] > b[i]
		}
	}
	return len(a) > len(b)
}
