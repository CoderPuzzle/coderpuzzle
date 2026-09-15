import "sort"

func maxSubarrayLength(nums []int) int {
	// A subarray nums[j..i] qualifies exactly when j < i and
	// nums[j] > nums[i]; only the two endpoints matter.
	n := len(nums)
	order := make([]int, n)
	for i := range order {
		order[i] = i
	}
	sort.Slice(order, func(a, b int) bool {
		return nums[order[a]] > nums[order[b]]
	})
	best := 0
	// Sentinel n can never beat any real position x <= n - 1.
	minIndex := n
	for g := 0; g < n; {
		h := g
		for h < n && nums[order[h]] == nums[order[g]] {
			h++
		}
		// Query first: positions of strictly larger values only, so
		// equal-valued endpoints can never pair with each other.
		for k := g; k < h; k++ {
			x := order[k]
			if minIndex < x && x-minIndex+1 > best {
				best = x - minIndex + 1
			}
		}
		// Then merge this equal-value group into the running minimum.
		for k := g; k < h; k++ {
			if x := order[k]; x < minIndex {
				minIndex = x
			}
		}
		g = h
	}
	return best
}
