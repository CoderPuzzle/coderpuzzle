import "container/heap"

type msaTail struct {
	value    int64
	shop     int
	position int
}

type msaTailHeap []msaTail

func (h msaTailHeap) Len() int            { return len(h) }
func (h msaTailHeap) Less(i, j int) bool  { return h[i].value < h[j].value }
func (h msaTailHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *msaTailHeap) Push(x interface{}) { *h = append(*h, x.(msaTail)) }
func (h *msaTailHeap) Pop() interface{} {
	old := *h
	last := old[len(old)-1]
	*h = old[:len(old)-1]
	return last
}

func maxSpending(values [][]int) int64 {
	// Each row is non-increasing, so a shop's cheapest unbought item
	// always sits at the moving tail. Buying the globally cheapest tail
	// on each (cheapest-first) day pairs every value with the smallest
	// day it can still take, which an exchange argument shows is
	// optimal: swapping any two days' purchases never pays.
	tails := &msaTailHeap{}
	for shop, row := range values {
		*tails = append(*tails, msaTail{int64(row[len(row)-1]), shop, len(row) - 1})
	}
	heap.Init(tails)
	total := int64(0)
	days := len(values) * len(values[0])
	for day := 1; day <= days; day++ {
		tail := heap.Pop(tails).(msaTail)
		total += tail.value * int64(day)
		if tail.position > 0 {
			heap.Push(tails, msaTail{
				int64(values[tail.shop][tail.position-1]),
				tail.shop,
				tail.position - 1,
			})
		}
	}
	return total
}
