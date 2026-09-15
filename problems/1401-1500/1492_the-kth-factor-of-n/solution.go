func kthFactor(n int, k int) int {
	small := []int{}
	for i := 1; i*i <= n; i++ {
		if n%i == 0 {
			small = append(small, i)
			if len(small) == k {
				return i
			}
		}
	}
	count := len(small)
	root := 0
	for root*root < n {
		root++
	}
	perfectSquare := root*root == n && n%root == 0
	total := 2 * count
	if perfectSquare {
		total--
	}
	if k > total {
		return -1
	}
	return n / small[total-k]
}
