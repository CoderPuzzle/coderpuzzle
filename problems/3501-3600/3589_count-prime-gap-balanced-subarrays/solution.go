// Sieve, then slide a window whose spread is taken over prime values
// alone: two monotonic deques of prime positions expose the window's
// min/max prime, and lo is the minimal left end whose prime spread is
// <= k. Widening leftward only adds primes, so the starts that keep the
// spread <= k form a suffix; starts that keep at least two primes inside
// form a prefix ending at prev2, the second-to-last prime position at or
// before the right end. The two ranges intersect in [lo, prev2], and each
// start there yields one balanced subarray ending here — add its length
// per right end.
func primeSubarray(nums []int, k int) int {
	limit := 0
	for _, value := range nums {
		if value > limit {
			limit = value
		}
	}
	isPrime := make([]bool, limit+1)
	for value := 2; value <= limit; value++ {
		isPrime[value] = true
	}
	for value := 2; value*value <= limit; value++ {
		if isPrime[value] {
			for multiple := value * value; multiple <= limit; multiple += value {
				isPrime[multiple] = false
			}
		}
	}
	var total int64
	lo := 0
	prev1, prev2 := -1, -1 // last two prime positions at or before i
	mins := []int{}        // prime positions, values increasing
	maxs := []int{}        // prime positions, values decreasing
	for i := 0; i < len(nums); i++ {
		if isPrime[nums[i]] {
			for len(mins) > 0 && nums[mins[len(mins)-1]] >= nums[i] {
				mins = mins[:len(mins)-1]
			}
			mins = append(mins, i)
			for len(maxs) > 0 && nums[maxs[len(maxs)-1]] <= nums[i] {
				maxs = maxs[:len(maxs)-1]
			}
			maxs = append(maxs, i)
			prev2, prev1 = prev1, i
		}
		if prev2 >= 0 {
			for nums[maxs[0]]-nums[mins[0]] > k {
				if mins[0] == lo {
					mins = mins[1:]
				}
				if maxs[0] == lo {
					maxs = maxs[1:]
				}
				lo++
			}
			if prev2 >= lo {
				total += int64(prev2 - lo + 1)
			}
		}
	}
	return int(total)
}
