import "sort"

func maxFixedPoints(nums []int) int {
	candidates := make([][2]int, 0, len(nums))
	for i, value := range nums {
		if value <= i {
			candidates = append(candidates, [2]int{value, i - value})
		}
	}
	sort.Slice(candidates, func(i, j int) bool {
		return candidates[i][0] < candidates[j][0] ||
			(candidates[i][0] == candidates[j][0] && candidates[i][1] < candidates[j][1])
	})
	bit := make([]int, len(nums)+1)
	query := func(original int) int {
		best := 0
		for index := original + 1; index > 0; index -= index & -index {
			if bit[index] > best {
				best = bit[index]
			}
		}
		return best
	}
	update := func(original, value int) {
		for index := original + 1; index < len(bit); index += index & -index {
			if value > bit[index] {
				bit[index] = value
			}
		}
	}
	answer := 0
	for start := 0; start < len(candidates); {
		end := start
		pending := [][2]int{}
		for end < len(candidates) && candidates[end][0] == candidates[start][0] {
			deletionCount := candidates[end][1]
			length := query(deletionCount) + 1
			pending = append(pending, [2]int{deletionCount, length})
			if length > answer {
				answer = length
			}
			end++
		}
		for _, item := range pending {
			update(item[0], item[1])
		}
		start = end
	}
	return answer
}
