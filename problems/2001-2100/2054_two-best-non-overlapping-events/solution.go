import "sort"

func maxTwoEvents(events [][]int) int {
	sort.Slice(events, func(left, right int) bool {
		return events[left][0] < events[right][0]
	})
	suffixMaximum := make([]int, len(events)+1)
	for index := len(events) - 1; index >= 0; index-- {
		suffixMaximum[index] = suffixMaximum[index+1]
		if events[index][2] > suffixMaximum[index] {
			suffixMaximum[index] = events[index][2]
		}
	}

	answer := 0
	for _, event := range events {
		low, high := 0, len(events)
		for low < high {
			middle := low + (high-low)/2
			if events[middle][0] <= event[1] {
				low = middle + 1
			} else {
				high = middle
			}
		}
		candidate := event[2] + suffixMaximum[low]
		if candidate > answer {
			answer = candidate
		}
	}

	return answer
}
