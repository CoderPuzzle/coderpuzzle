func minOperations(nums []int, k int) int {
	remainders := make([]int, len(nums))
	for i, value := range nums {
		remainders[i] = value % k
	}
	answer := 1 << 30
	for x := 0; x < k; x++ {
		for y := 0; y < k; y++ {
			if x == y {
				continue
			}
			total := 0
			for i, current := range remainders {
				target := x
				if i%2 == 1 {
					target = y
				}
				up := (target - current + k) % k
				down := (current - target + k) % k
				if down < up {
					up = down
				}
				total += up
			}
			if total < answer {
				answer = total
			}
		}
	}
	return answer
}
