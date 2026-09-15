import (
	"sort"
	"strconv"
)

func findSubsequences(nums []int) [][]int {
	// One decision per index — take the value or skip it — so every leaf of
	// the tree is exactly one subset of indices. A leaf holding at least two
	// non-decreasing values is one answer; equal values reach the same value
	// sequence through different index subsets, so a set absorbs those
	// duplicates and the final sort emits the pinned lexicographic order.
	// The map's key is the sequence joined with commas, which integers
	// cannot contain, so distinct keys mean distinct sequences.
	found := make(map[string][]int)
	current := make([]int, 0, len(nums))

	var walk func(index int)
	walk = func(index int) {
		if index == len(nums) {
			if len(current) >= 2 {
				sequence := make([]int, len(current))
				copy(sequence, current)
				key := ""
				for i, value := range sequence {
					if i > 0 {
						key += ","
					}
					key += strconv.Itoa(value)
				}
				found[key] = sequence
			}
			return
		}
		// Take nums[index] when it does not decrease.
		if len(current) == 0 || nums[index] >= current[len(current)-1] {
			current = append(current, nums[index])
			walk(index + 1)
			current = current[:len(current)-1]
		}
		// Skip nums[index].
		walk(index + 1)
	}

	walk(0)
	results := make([][]int, 0, len(found))
	for _, sequence := range found {
		results = append(results, sequence)
	}
	sort.Slice(results, func(i, j int) bool {
		return compareInts(results[i], results[j]) < 0
	})
	return results
}

func compareInts(left, right []int) int {
	shared := len(left)
	if len(right) < shared {
		shared = len(right)
	}
	for i := 0; i < shared; i++ {
		if left[i] != right[i] {
			if left[i] < right[i] {
				return -1
			}
			return 1
		}
	}
	switch {
	case len(left) < len(right):
		return -1
	case len(left) > len(right):
		return 1
	}
	return 0
}
