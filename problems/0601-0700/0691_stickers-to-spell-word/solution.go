// BFS over the bitmask of spelled target positions: bit i is set once
// position i holds a cut letter. From each state, one copy of a sticker
// spends its letters on the uncovered positions left to right — covering
// more positions with the same single copy can never hurt, since equal
// letters are interchangeable. Layers of the BFS are sticker counts, so
// the first visit to the full mask is the minimum; a target letter found
// on no sticker at all makes the task impossible.
func minStickers(stickers []string, target string) int {
	m := len(target)
	full := 1<<m - 1
	need := make([]int, m)
	var available [26]bool
	for _, word := range stickers {
		for i := 0; i < len(word); i++ {
			available[word[i]-'a'] = true
		}
	}
	for i := 0; i < m; i++ {
		index := int(target[i] - 'a')
		if !available[index] {
			return -1
		}
		need[i] = index
	}
	var stocks [][26]int
	for _, word := range stickers {
		var counts [26]int
		for i := 0; i < len(word); i++ {
			counts[word[i]-'a']++
		}
		stocks = append(stocks, counts)
	}
	distance := make([]int, full+1)
	for i := range distance {
		distance[i] = -1
	}
	distance[0] = 0
	queue := []int{0}
	for len(queue) > 0 {
		mask := queue[0]
		queue = queue[1:]
		if mask == full {
			return distance[mask]
		}
		steps := distance[mask] + 1
		for _, counts := range stocks {
			remaining := counts
			next := mask
			for i, index := range need {
				bit := 1 << i
				if mask&bit == 0 && remaining[index] > 0 {
					remaining[index]--
					next |= bit
				}
			}
			if next != mask && distance[next] < 0 {
				distance[next] = steps
				queue = append(queue, next)
			}
		}
	}
	return -1
}
