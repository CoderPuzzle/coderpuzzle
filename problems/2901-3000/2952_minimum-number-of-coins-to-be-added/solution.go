import "sort"

func minimumAddedCoins(coins []int, target int) int {
	sorted := make([]int, len(coins))
	copy(sorted, coins)
	sort.Ints(sorted)
	reach := int64(0) // every value in [1, reach] is obtainable
	added := 0
	i := 0
	for reach < int64(target) {
		if i < len(sorted) && int64(sorted[i]) <= reach+1 {
			reach += int64(sorted[i])
			i++
		} else {
			// must add the coin worth reach + 1
			reach += reach + 1
			added++
		}
	}
	return added
}
