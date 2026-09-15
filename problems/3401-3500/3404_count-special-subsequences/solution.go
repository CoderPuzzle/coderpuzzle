func numberOfSubsequences(nums []int) int64 {
	// nums[p] * nums[r] == nums[q] * nums[s] rearranges to
	// nums[p] / nums[q] == nums[s] / nums[r]: a leading pair (p, q) and a
	// trailing pair (r, s) sharing one reduced fraction. Sweep r left to
	// right; when r clears q + 2 the pair (p, q) joins the counter, and
	// every (r, s) with s >= r + 2 looks its fraction up.
	type ratio struct {
		num int
		den int
	}
	counts := make(map[ratio]int)
	var total int64
	for r := range nums {
		if r >= 2 {
			q := r - 2
			for p := 0; p <= q-2; p++ {
				d := gcd(nums[p], nums[q])
				counts[ratio{nums[p] / d, nums[q] / d}]++
			}
		}
		for s := r + 2; s < len(nums); s++ {
			d := gcd(nums[s], nums[r])
			total += int64(counts[ratio{nums[s] / d, nums[r] / d}])
		}
	}
	return total
}

func gcd(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
