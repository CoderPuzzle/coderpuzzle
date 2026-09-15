func minLights(lights []int) int {
	n := len(lights)
	diff := make([]int, n+1)
	for i, radius := range lights {
		if radius == 0 {
			continue
		}
		left := i - radius
		if left < 0 {
			left = 0
		}
		right := i + radius
		if right >= n {
			right = n - 1
		}
		diff[left]++
		diff[right+1]--
	}
	covered := make([]bool, n)
	current := 0
	for i := 0; i < n; i++ {
		current += diff[i]
		covered[i] = current > 0
	}

	answer := 0
	for i := 0; i < n; i++ {
		if !covered[i] {
			answer++
			end := i + 2
			if end >= n {
				end = n - 1
			}
			for j := i; j <= end; j++ {
				covered[j] = true
			}
			i = end
		}
	}
	return answer
}
