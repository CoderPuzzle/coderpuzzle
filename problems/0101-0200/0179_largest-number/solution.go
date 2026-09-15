import (
	"sort"
	"strconv"
	"strings"
)

func largestNumber(nums []int) string {
	strs := make([]string, len(nums))
	for i, n := range nums {
		strs[i] = strconv.Itoa(n)
	}
	// a precedes b exactly when the concatenation a+b beats b+a — numeric
	// comparison is useless (3 must come before 30). A sorted result admits
	// no adjacent swap that enlarges the string, so it is maximal.
	sort.Slice(strs, func(a, b int) bool {
		return strs[a]+strs[b] > strs[b]+strs[a]
	})
	result := strings.Join(strs, "")
	// Leading zero means every input was 0.
	if result[0] == '0' {
		return "0"
	}
	return result
}
