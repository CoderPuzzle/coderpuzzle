func validPartition(nums []int) bool {
	// ok[i] = the prefix nums[:i] has a valid partition; its final block is
	// a good pair or good triple, leaving a shorter prefix whose validity is
	// ok[i-2] / ok[i-3]. Single forward pass.
	n := len(nums)
	ok := make([]bool, n+1)
	ok[0] = true
	for i := 2; i <= n; i++ {
		if nums[i-1] == nums[i-2] {
			ok[i] = ok[i] || ok[i-2]
		}
		if i >= 3 {
			if nums[i-1] == nums[i-2] && nums[i-2] == nums[i-3] {
				ok[i] = ok[i] || ok[i-3]
			} else if nums[i-2]-nums[i-3] == 1 && nums[i-1]-nums[i-2] == 1 {
				ok[i] = ok[i] || ok[i-3]
			}
		}
	}
	return ok[n]
}
