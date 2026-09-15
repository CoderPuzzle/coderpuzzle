func longestAlternating(nums []int) int {
	// inc/dec: longest alternating subarray ending at i whose last
	// comparison is < / > (1 = the lone nums[i]); rinc/rdec: the same for
	// subarrays starting at j, by first comparison. Every value stays
	// within 2 * 10^5, so int arithmetic is safe.
	n := len(nums)
	inc := make([]int, n)
	dec := make([]int, n)
	for i := range inc {
		inc[i] = 1
		dec[i] = 1
	}
	for i := 1; i < n; i++ {
		if nums[i-1] < nums[i] {
			inc[i] = dec[i-1] + 1
		} else if nums[i-1] > nums[i] {
			dec[i] = inc[i-1] + 1
		}
	}
	rinc := make([]int, n)
	rdec := make([]int, n)
	for j := range rinc {
		rinc[j] = 1
		rdec[j] = 1
	}
	for j := n - 2; j >= 0; j-- {
		if nums[j] < nums[j+1] {
			rinc[j] = rdec[j+1] + 1
		} else if nums[j] > nums[j+1] {
			rdec[j] = rinc[j+1] + 1
		}
	}
	best := 1
	for i := 0; i < n; i++ {
		if inc[i] > best {
			best = inc[i]
		}
		if dec[i] > best {
			best = dec[i]
		}
	}
	// Removing nums[r] only helps when the subarray spans it: the bridge
	// comparison nums[r-1] vs nums[r+1] must alternate with both edge
	// comparisons; equal neighbours bridge nothing.
	for r := 1; r < n-1; r++ {
		var cand int
		if nums[r-1] < nums[r+1] {
			cand = dec[r-1] + rdec[r+1]
		} else if nums[r-1] > nums[r+1] {
			cand = inc[r-1] + rinc[r+1]
		} else {
			continue
		}
		if cand > best {
			best = cand
		}
	}
	return best
}
