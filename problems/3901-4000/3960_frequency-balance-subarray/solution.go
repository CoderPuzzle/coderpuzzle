func getLength(nums []int) int {
	n := len(nums)
	best := 1
	for left := 0; left < n; left++ {
		counts := make(map[int]int)
		frequencyGroups := make([]int, n+1)
		levelCount, levelSum, levelSquareSum := 0, 0, 0

		for right := left; right < n; right++ {
			value := nums[right]
			oldFrequency := counts[value]
			if oldFrequency > 0 {
				frequencyGroups[oldFrequency]--
				if frequencyGroups[oldFrequency] == 0 {
					levelCount--
					levelSum -= oldFrequency
					levelSquareSum -= oldFrequency * oldFrequency
				}
			}

			newFrequency := oldFrequency + 1
			if frequencyGroups[newFrequency] == 0 {
				levelCount++
				levelSum += newFrequency
				levelSquareSum += newFrequency * newFrequency
			}
			frequencyGroups[newFrequency]++
			counts[value] = newFrequency

			balanced := len(counts) == 1
			if levelCount == 2 && levelSum%3 == 0 {
				lower := levelSum / 3
				balanced = levelSquareSum == 5*lower*lower
			}
			if balanced && right-left+1 > best {
				best = right - left + 1
			}
		}
	}
	return best
}
