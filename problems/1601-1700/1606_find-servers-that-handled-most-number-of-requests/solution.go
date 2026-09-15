import (
	"container/heap"
)

type finishItem struct {
	finish int
	server int
}

type finishHeap []finishItem

func (h finishHeap) Len() int           { return len(h) }
func (h finishHeap) Less(a, b int) bool { return h[a].finish < h[b].finish }
func (h finishHeap) Swap(a, b int)      { h[a], h[b] = h[b], h[a] }
func (h *finishHeap) Push(x interface{}) {
	*h = append(*h, x.(finishItem))
}
func (h *finishHeap) Pop() interface{} {
	old := *h
	item := old[len(old)-1]
	*h = old[:len(old)-1]
	return item
}

func busiestServers(k int, arrival []int, load []int) []int {
	tree := make([]int, k+1)
	update := func(server, delta int) {
		i := server + 1
		for i <= k {
			tree[i] += delta
			i += i & (-i)
		}
	}
	query := func(count int) int {
		sum := 0
		i := count
		for i > 0 {
			sum += tree[i]
			i -= i & (-i)
		}
		return sum
	}
	findKth := func(rank int) int {
		pos := 0
		pw := 1
		for pw*2 <= k {
			pw *= 2
		}
		for pw > 0 {
			if pos+pw <= k && tree[pos+pw] < rank {
				pos += pw
				rank -= tree[pos]
			}
			pw /= 2
		}
		return pos
	}

	for server := 0; server < k; server++ {
		update(server, 1)
	}

	n := len(arrival)
	counts := make([]int, k)
	h := &finishHeap{}
	heap.Init(h)

	for i := 0; i < n; i++ {
		startTime := arrival[i]
		for h.Len() > 0 && (*h)[0].finish <= startTime {
			freed := heap.Pop(h).(finishItem)
			update(freed.server, 1)
		}

		totalFree := query(k)
		if totalFree == 0 {
			continue
		}

		start := i % k
		beforeStart := query(start)
		var server int
		if beforeStart < totalFree {
			server = findKth(beforeStart + 1)
		} else {
			server = findKth(1)
		}

		update(server, -1)
		counts[server]++
		heap.Push(h, finishItem{finish: startTime + load[i], server: server})
	}

	busiest := 0
	for _, c := range counts {
		if c > busiest {
			busiest = c
		}
	}
	answer := []int{}
	for server := 0; server < k; server++ {
		if counts[server] == busiest {
			answer = append(answer, server)
		}
	}
	return answer
}
