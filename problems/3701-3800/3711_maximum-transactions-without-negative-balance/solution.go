import "container/heap"

func maxTransactions(transactions []int) int {
	// Greedy scan with a max-heap of the debits already taken: take every
	// transaction that leaves the balance nonnegative, and when a debit
	// does not fit, refund the largest debit taken earlier if it was
	// strictly bigger and take the smaller one instead — same count, a
	// higher balance, and room for later, smaller debits. Running
	// balances reach 10^14; Go's int is 64-bit on the judge platform.
	balance := 0
	kept := 0
	debits := &maxDebitHeap{}
	for _, t := range transactions {
		if t >= 0 || balance+t >= 0 {
			kept++
			balance += t
			if t < 0 {
				heap.Push(debits, -t)
			}
		} else if debits.Len() > 0 && (*debits)[0] > -t {
			balance += heap.Pop(debits).(int) // refund the larger debit
			balance += t
			heap.Push(debits, -t)
		}
	}
	return kept
}

type maxDebitHeap []int

func (h maxDebitHeap) Len() int            { return len(h) }
func (h maxDebitHeap) Less(a, b int) bool  { return h[a] > h[b] }
func (h maxDebitHeap) Swap(a, b int)       { h[a], h[b] = h[b], h[a] }
func (h *maxDebitHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *maxDebitHeap) Pop() interface{} {
	old := *h
	n := len(old)
	top := old[n-1]
	*h = old[:n-1]
	return top
}
