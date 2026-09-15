func minSumOfLengths(arr []int, target int64) int {
	const inf = int(^uint(0) >> 1)
	n := len(arr)
	best := make([]int, n)
	for i := range best {
		best[i] = inf
	}
	answer := inf
	bestSoFar := inf
	var windowSum int64
	left := 0
	for right := 0; right < n; right++ {
		windowSum += int64(arr[right])
		for windowSum > target {
			windowSum -= int64(arr[left])
			left++
		}
		if windowSum == target {
			length := right - left + 1
			if left > 0 && best[left-1] != inf {
				if best[left-1]+length < answer {
					answer = best[left-1] + length
				}
			}
			if length < bestSoFar {
				bestSoFar = length
			}
		}
		best[right] = bestSoFar
	}
	if answer == inf {
		return -1
	}
	return answer
}
