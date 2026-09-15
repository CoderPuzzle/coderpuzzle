import "sort"

func filterRestaurants(restaurants [][]int, veganFriendly int, maxPrice int, maxDistance int) []int {
	// Inclusive caps; the vegan filter only bites when it is 1. Survivors
	// sort by rating desc, then id desc.
	kept := make([][]int, 0, len(restaurants))
	for _, entry := range restaurants {
		if (veganFriendly == 0 || entry[2] == 1) && entry[3] <= maxPrice && entry[4] <= maxDistance {
			kept = append(kept, entry)
		}
	}
	sort.Slice(kept, func(a, b int) bool {
		if kept[a][1] != kept[b][1] {
			return kept[a][1] > kept[b][1]
		}
		return kept[a][0] > kept[b][0]
	})
	out := make([]int, 0, len(kept))
	for _, entry := range kept {
		out = append(out, entry[0])
	}
	return out
}
