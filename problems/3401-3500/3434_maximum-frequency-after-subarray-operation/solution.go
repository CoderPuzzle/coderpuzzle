// Fix the source value v the operation converts into k (x = k - v). A
// window then nets +1 for each v it captures and -1 for each k it
// destroys, so the best window for v is the maximum-subarray run of that
// score — reset to 0 when it dips negative, since choosing x = 0 keeps
// the untouched baseline.
func maxFrequency(nums []int, k int) int {
	base := 0
	for _, value := range nums {
		if value == k {
			base++
		}
	}
	best := 0
	for v := 1; v <= 50; v++ {
		if v == k {
			continue
		}
		run := 0
		for _, value := range nums {
			if value == v {
				run++
			} else if value == k {
				run--
			}
			if run < 0 {
				run = 0
			}
			if run > best {
				best = run
			}
		}
	}
	return base + best
}
