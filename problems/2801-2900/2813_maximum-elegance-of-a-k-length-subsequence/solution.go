import "sort"

func findMaximumElegance(items [][]int, k int) int64 {
	sorted := make([][]int, len(items))
	copy(sorted, items)
	// sort descending lexicographically (profit, then category)
	sort.Slice(sorted, func(a, b int) bool {
		if sorted[a][0] != sorted[b][0] {
			return sorted[a][0] > sorted[b][0]
		}
		return sorted[a][1] > sorted[b][1]
	})
	total := int64(0)
	counts := make(map[int]int)
	for i := 0; i < k; i++ {
		total += int64(sorted[i][0])
		counts[sorted[i][1]]++
	}
	distinct := int64(len(counts))
	ans := total + distinct*distinct

	// min-heap of (profit, category) for duplicated categories among top-k;
	// the heap is never pushed to after construction, so a sorted list with
	// a moving pointer reproduces the pop order exactly.
	heap := [][2]int{}
	for i := 0; i < k; i++ {
		if counts[sorted[i][1]] > 1 {
			heap = append(heap, [2]int{sorted[i][0], sorted[i][1]})
		}
	}
	sort.Slice(heap, func(a, b int) bool {
		if heap[a][0] != heap[b][0] {
			return heap[a][0] < heap[b][0]
		}
		return heap[a][1] < heap[b][1]
	})
	h := 0

	for i := k; i < len(sorted); i++ {
		p, c := sorted[i][0], sorted[i][1]
		if _, ok := counts[c]; ok {
			continue
		}
		for h < len(heap) && counts[heap[h][1]] <= 1 {
			h++
		}
		if h >= len(heap) {
			break
		}
		minP, minC := heap[h][0], heap[h][1]
		h++
		total = total - int64(minP) + int64(p)
		counts[minC]--
		counts[c] = 1
		distinct++
		if cand := total + distinct*distinct; cand > ans {
			ans = cand
		}
	}
	return ans
}
