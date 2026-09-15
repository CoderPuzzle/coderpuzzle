import "container/heap"

// Two heaps: sells as a min-heap on price, buys as a max-heap. An
// incoming batch trades with the best-priced opposing batch while the
// price condition holds; only its unmatched remainder joins the backlog
// as one new batch.
func getNumberOfBacklogOrders(orders [][]int) int {
	sells := &sellHeap{}
	buys := &buyHeap{}
	for _, o := range orders {
		price, amount := int64(o[0]), int64(o[1])
		if o[2] == 0 {
			for amount > 0 && sells.Len() > 0 && (*sells)[0].price <= price {
				take := min(amount, (*sells)[0].amount)
				amount -= take
				(*sells)[0].amount -= take
				if (*sells)[0].amount == 0 {
					heap.Pop(sells)
				}
			}
			if amount > 0 {
				heap.Push(buys, batch{price, amount})
			}
		} else {
			for amount > 0 && buys.Len() > 0 && (*buys)[0].price >= price {
				take := min(amount, (*buys)[0].amount)
				amount -= take
				(*buys)[0].amount -= take
				if (*buys)[0].amount == 0 {
					heap.Pop(buys)
				}
			}
			if amount > 0 {
				heap.Push(sells, batch{price, amount})
			}
		}
	}
	// Totals reach 1e5 * 1e9 = 1e14, so the sum is accumulated in 64-bit
	// integers and reduced modulo 1e9 + 7 at the end.
	total := int64(0)
	for _, b := range *sells {
		total += b.amount
	}
	for _, b := range *buys {
		total += b.amount
	}
	return int(total % 1000000007)
}

type batch struct {
	price, amount int64
}

type sellHeap []batch // min-heap on price

func (h sellHeap) Len() int            { return len(h) }
func (h sellHeap) Less(i, j int) bool  { return h[i].price < h[j].price }
func (h sellHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *sellHeap) Push(x interface{}) { *h = append(*h, x.(batch)) }
func (h *sellHeap) Pop() interface{} {
	old := *h
	n := len(old)
	top := old[n-1]
	*h = old[:n-1]
	return top
}

type buyHeap []batch // max-heap on price

func (h buyHeap) Len() int            { return len(h) }
func (h buyHeap) Less(i, j int) bool  { return h[i].price > h[j].price }
func (h buyHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *buyHeap) Push(x interface{}) { *h = append(*h, x.(batch)) }
func (h *buyHeap) Pop() interface{} {
	old := *h
	n := len(old)
	top := old[n-1]
	*h = old[:n-1]
	return top
}
