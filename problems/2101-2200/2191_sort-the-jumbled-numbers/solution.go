import "sort"

// Map each number once, then stable-sort by the mapped value so equal
// keys keep their input order. Values reach 10^9 - 1 and mapped values
// stay within int on all supported platforms; use int64 to be safe.
func sortJumbled(mapping []int, nums []int) []int {
	mapped := func(value int64) int64 {
		if value == 0 {
			return int64(mapping[0])
		}
		var out int64
		scale := int64(1)
		for rest := value; rest > 0; rest /= 10 {
			out += int64(mapping[rest%10]) * scale
			scale *= 10
		}
		return out
	}
	type keyed struct {
		value int64
		index int
	}
	order := make([]keyed, len(nums))
	for i, v := range nums {
		order[i] = keyed{mapped(int64(v)), i}
	}
	sort.SliceStable(order, func(a, b int) bool {
		return order[a].value < order[b].value
	})
	result := make([]int, len(nums))
	for i, entry := range order {
		result[i] = nums[entry.index]
	}
	return result
}
