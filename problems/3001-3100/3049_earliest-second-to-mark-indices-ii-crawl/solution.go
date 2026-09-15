import (
	"container/heap"
	"sort"
)

type intMinHeap []int

func (h intMinHeap) Len() int            { return len(h) }
func (h intMinHeap) Less(a, b int) bool  { return h[a] < h[b] }
func (h intMinHeap) Swap(a, b int)       { h[a], h[b] = h[b], h[a] }
func (h *intMinHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *intMinHeap) Pop() interface{} {
	old := *h
	item := old[len(old)-1]
	*h = old[:len(old)-1]
	return item
}

func earliestSecondToMarkIndices(nums []int, changeIndices []int) int {
	n := len(nums)
	// Binary search the horizon: finishing within t seconds also finishes
	// within t + 1.
	canFinish := func(t int) bool {
		// Fewer seconds than indices can never mark them all.
		if t < n {
			return false
		}
		// First occurrence of every index within [1, t]: clearing at the
		// earliest chance dominates any later pin, since an earlier
		// set-second only relaxes where the mark may land.
		first := map[int]int{}
		for s := 0; s < t; s++ {
			if _, ok := first[changeIndices[s]]; !ok {
				first[changeIndices[s]] = s + 1
			}
		}
		deadlines := make([]int, 0, len(first))
		for _, f := range first {
			deadlines = append(deadlines, f)
		}
		sort.Sort(sort.Reverse(sort.IntSlice(deadlines)))
		// Sweep pinned seconds latest to earliest, banking each clearance's
		// saving of nums[v] - 1 (one set-op replaces the whole decrement
		// chain). Every suffix of chosen clearances needs distinct marks
		// after its deadline outside its own pins, capping the suffix at
		// half the window 2*chosen <= t-f+1; on a breach give back the
		// banked clearance with the smallest saving.
		bank := &intMinHeap{}
		saved := 0
		chosen := 0
		for _, f := range deadlines {
			c := nums[changeIndices[f-1]-1]
			if c < 2 {
				continue
			}
			heap.Push(bank, c)
			saved += c - 1
			chosen++
			for 2*chosen > t-f+1 {
				saved -= heap.Pop(bank).(int) - 1
				chosen--
			}
		}
		// Uncleared indices keep their decrement chains; the surviving work
		// plus one mark per index must fit into [1, t]. Values reach
		// n * 10^9 and int is 64-bit wide on the judge platform.
		total := n
		for _, x := range nums {
			total += x
		}
		return total-saved <= t
	}

	lo, hi := 1, len(changeIndices)
	if !canFinish(hi) {
		return -1
	}
	for lo < hi {
		mid := (lo + hi) / 2
		if canFinish(mid) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}
