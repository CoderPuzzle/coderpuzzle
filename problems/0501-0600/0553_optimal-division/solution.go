import (
	"strconv"
	"strings"
)

// One or two values leave nothing to regroup, so the bare left-to-right join
// is the whole answer. From three on, every value is positive and the
// expression is maximized by dividing nums[0] by the smallest possible
// denominator — the flat chain a1/a2/.../an-1 = a1/(a2*...*an-1), which
// pulls every later value into that denominator's numerator.
func optimalDivision(nums []int) string {
	parts := make([]string, len(nums))
	for i, value := range nums {
		parts[i] = strconv.Itoa(value)
	}
	if len(parts) <= 2 {
		return strings.Join(parts, "/")
	}
	return parts[0] + "/(" + strings.Join(parts[1:], "/") + ")"
}
