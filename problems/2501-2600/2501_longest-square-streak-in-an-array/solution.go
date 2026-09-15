import (
	"math"
	"sort"
)

func longestSquareStreak(nums []int) int {
	// A sorted streak always steps v -> v*v, so scanning the distinct
	// values ascending makes each value extend at most one chain: the one
	// ending at its integer square root, when that root is itself present.
	// Roots stay below 317, so squaring them cannot overflow.
	set := make(map[int]bool, len(nums))
	for _, v := range nums {
		set[v] = true
	}
	values := make([]int, 0, len(set))
	for v := range set {
		values = append(values, v)
	}
	sort.Ints(values)
	length := make(map[int]int)
	longest := 0
	for _, value := range values {
		root := int(math.Round(math.Sqrt(float64(value))))
		prev, extends := length[root]
		len := 1
		if extends && root*root == value {
			len = prev + 1
		}
		length[value] = len
		longest = max(longest, len)
	}
	if longest >= 2 {
		return longest
	}
	return -1
}
