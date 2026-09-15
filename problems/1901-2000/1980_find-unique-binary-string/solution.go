func findDifferentBinaryString(nums []string) string {
	n := len(nums)
	answer := make([]byte, n)
	for i := 0; i < n; i++ {
		if nums[i][i] == '0' {
			answer[i] = '1'
		} else {
			answer[i] = '0'
		}
	}
	return string(answer)
}
