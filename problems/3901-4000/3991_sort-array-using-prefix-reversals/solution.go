import (
	"fmt"
	"sort"
)

func sortArray(nums []int, pre []int) int {
	target := append([]int(nil), nums...)
	sort.Ints(target)
	if equal(nums, target) {
		return 0
	}

	queue := [][]int{nums}
	distance := map[string]int{key(nums): 0}
	for head := 0; head < len(queue); head++ {
		state := queue[head]
		current := distance[key(state)]
		for _, length := range pre {
			next := append([]int(nil), state...)
			for i, j := 0, length-1; i < j; i, j = i+1, j-1 {
				next[i], next[j] = next[j], next[i]
			}
			if equal(next, target) {
				return current + 1
			}
			nextKey := key(next)
			if _, ok := distance[nextKey]; !ok {
				distance[nextKey] = current + 1
				queue = append(queue, next)
			}
		}
	}
	return -1
}

func key(values []int) string {
	result := ""
	for _, value := range values {
		result += fmt.Sprintf("%d,", value)
	}
	return result
}

func equal(a []int, b []int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}
