import (
	"container/heap"
	"strings"
)

type countItem struct {
	count  int
	letter int
}

type countHeap []countItem

func (h countHeap) Len() int { return len(h) }
func (h countHeap) Less(a, b int) bool {
	// The pinned pass order: largest remaining count first, ties to the
	// smaller letter.
	if h[a].count != h[b].count {
		return h[a].count > h[b].count
	}
	return h[a].letter < h[b].letter
}
func (h countHeap) Swap(a, b int) { h[a], h[b] = h[b], h[a] }
func (h *countHeap) Push(x interface{}) {
	*h = append(*h, x.(countItem))
}
func (h *countHeap) Pop() interface{} {
	old := *h
	item := old[len(old)-1]
	*h = old[:len(old)-1]
	return item
}

func rearrangeString(s string, k int) string {
	// Distance k apart is vacuous when k <= 1: any two positions already
	// qualify, and the pinned canonical returns s unchanged.
	if k <= 1 {
		return s
	}
	counts := [26]int{}
	for i := 0; i < len(s); i++ {
		counts[s[i]-'a']++
	}
	h := &countHeap{}
	for letter, count := range counts {
		if count > 0 {
			*h = append(*h, countItem{count: count, letter: letter})
		}
	}
	heap.Init(h)
	var out strings.Builder
	total := len(s)
	for total > 0 {
		take := k
		if h.Len() < take {
			take = h.Len()
		}
		// Fewer than k distinct letters while more remain: some window of k
		// consecutive positions would have to repeat a letter, so no
		// arrangement exists.
		if take < k && total > take {
			return ""
		}
		// Drain the pass before pushing back, so a letter never repeats
		// within its own pass.
		taken := make([]countItem, 0, take)
		for i := 0; i < take; i++ {
			taken = append(taken, heap.Pop(h).(countItem))
		}
		for _, item := range taken {
			out.WriteByte(byte('a' + item.letter))
			total--
			if item.count-1 > 0 {
				heap.Push(h, countItem{count: item.count - 1, letter: item.letter})
			}
		}
	}
	return out.String()
}
