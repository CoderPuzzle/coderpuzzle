import "sort"

func maximumWidth(planks []int) int {
	// For a fixed fence height h: every height-h plank joins the fence
	// as is, and planks of any other height can only contribute as
	// halves of disjoint pairs summing to h. A height-h plank itself can
	// never be in such a pair (its partner would need height 0), so
	// singles and pairs never compete for a plank: their counts add.
	freq := make(map[int]int)
	for _, plank := range planks {
		freq[plank]++
	}
	heights := make([]int, 0, len(freq))
	for height := range freq {
		heights = append(heights, height)
	}
	sort.Ints(heights)
	// bucket[s] = number of disjoint pairs of planks whose heights sum
	// to s, accumulated once over every unordered pair of height values.
	bucket := make(map[int]int)
	for i, x := range heights {
		if countX := freq[x]; countX >= 2 {
			bucket[2*x] += countX / 2
		}
		for _, y := range heights[i+1:] {
			pairs := freq[x]
			if freq[y] < pairs {
				pairs = freq[y]
			}
			bucket[x+y] += pairs
		}
	}
	// Achievable fence heights are exactly the original heights plus the
	// pairwise sums; a lone plank already builds a width-1 fence.
	best := 0
	for _, count := range freq {
		if count > best {
			best = count
		}
	}
	for sum, pairs := range bucket {
		total := pairs + freq[sum]
		if total > best {
			best = total
		}
	}
	return best
}
