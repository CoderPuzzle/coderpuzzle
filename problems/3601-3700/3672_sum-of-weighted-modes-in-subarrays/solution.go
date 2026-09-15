import "container/heap"

type modeEntry struct {
	frequency int
	value     int
}

// modeEntryHeap orders entries by higher frequency first, then by the
// smaller value, so the heap top is the window's mode under the
// statement's tie-break.
type modeEntryHeap []modeEntry

func (h modeEntryHeap) Len() int { return len(h) }
func (h modeEntryHeap) Less(i, j int) bool {
	if h[i].frequency != h[j].frequency {
		return h[i].frequency > h[j].frequency
	}
	return h[i].value < h[j].value
}
func (h modeEntryHeap) Swap(i, j int) { h[i], h[j] = h[j], h[i] }
func (h *modeEntryHeap) Push(x interface{}) {
	*h = append(*h, x.(modeEntry))
}
func (h *modeEntryHeap) Pop() interface{} {
	old := *h
	last := old[len(old)-1]
	*h = old[:len(old)-1]
	return last
}

func modeWeight(nums []int, k int) int64 {
	// cnt holds each value's frequency inside the window; bucket[f] counts
	// how many distinct values sit at frequency f, so the top frequency
	// tracks entries and exits in O(1). Stale entries (their recorded
	// frequency has since moved) are skimmed off when they reach the top —
	// every revisit of a state pushes a fresh copy, so discarding them
	// early is safe. Weights reach 10^10 and the total 2.5 * 10^14, so the
	// sum widens to int64.
	cnt := map[int]int{}
	bucket := map[int]int{}
	queue := &modeEntryHeap{}
	topFreq := 0
	var total int64
	for right, value := range nums {
		// Enter: lift the arriving value one frequency up.
		cnt[value]++
		bucket[cnt[value]]++
		if cnt[value] > 1 {
			bucket[cnt[value]-1]--
		}
		if cnt[value] > topFreq {
			topFreq = cnt[value]
		}
		heap.Push(queue, modeEntry{cnt[value], value})
		if right >= k {
			// Leave: drop the exiting value one frequency down; only a
			// one-step fall of the top frequency is ever possible.
			leaving := nums[right-k]
			cnt[leaving]--
			bucket[cnt[leaving]+1]--
			if cnt[leaving] > 0 {
				bucket[cnt[leaving]]++
				heap.Push(queue, modeEntry{cnt[leaving], leaving})
			}
			if bucket[topFreq] == 0 {
				topFreq--
			}
		}
		if right >= k-1 {
			// Skim stale tops, then score mode * top frequency.
			for cnt[(*queue)[0].value] != (*queue)[0].frequency {
				heap.Pop(queue)
			}
			total += int64((*queue)[0].value) * int64(topFreq)
		}
	}
	return total
}
