import (
	"container/heap"
	"sort"
)

// entry pairs a word with its occurrence count.
type entry struct {
	word  string
	count int
}

// wordHeap holds entries ordered so the root is the weakest keeper:
// smallest count, and among equal counts the largest word — eviction
// order mirrors the final ranking.
type wordHeap []entry

func (h wordHeap) Len() int { return len(h) }
func (h wordHeap) Less(i, j int) bool {
	if h[i].count != h[j].count {
		return h[i].count < h[j].count
	}
	return h[i].word > h[j].word
}
func (h wordHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *wordHeap) Push(x interface{}) { *h = append(*h, x.(entry)) }
func (h *wordHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func topKFrequent(words []string, k int) []string {
	// One counting pass over the array.
	counts := make(map[string]int)
	for _, w := range words {
		counts[w]++
	}
	h := &wordHeap{}
	for word, count := range counts {
		item := entry{word, count}
		if h.Len() < k {
			heap.Push(h, item)
			continue
		}
		root := (*h)[0]
		// Replace the root only when the newcomer outranks it: higher
		// count, or equal count and smaller word.
		if count > root.count || (count == root.count && word < root.word) {
			heap.Pop(h)
			heap.Push(h, item)
		}
	}
	survivors := append([]entry(nil), *h...)
	// Survivors are exactly the top k by (higher count, then smaller
	// word); emit them in that order.
	sort.Slice(survivors, func(i, j int) bool {
		if survivors[i].count != survivors[j].count {
			return survivors[i].count > survivors[j].count
		}
		return survivors[i].word < survivors[j].word
	})
	result := make([]string, 0, k)
	for i := 0; i < k && i < len(survivors); i++ {
		result = append(result, survivors[i].word)
	}
	return result
}
