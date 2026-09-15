import (
	"container/heap"
	"sort"
)

type stateItem struct {
	value int64
	index int
}

type stateHeap []stateItem

func (h stateHeap) Len() int { return len(h) }
func (h stateHeap) Less(a, b int) bool {
	if h[a].value != h[b].value {
		return h[a].value < h[b].value
	}
	return h[a].index < h[b].index
}
func (h stateHeap) Swap(a, b int) { h[a], h[b] = h[b], h[a] }
func (h *stateHeap) Push(x interface{}) {
	*h = append(*h, x.(stateItem))
}
func (h *stateHeap) Pop() interface{} {
	old := *h
	item := old[len(old)-1]
	*h = old[:len(old)-1]
	return item
}

func getFinalState(nums []int, k int, multiplier int) []int {
	const MOD = int64(1000000007)
	n := len(nums)
	result := make([]int, n)
	if multiplier == 1 {
		// x * 1 == x forever: no operation ever moves a value.
		for i, v := range nums {
			result[i] = int(int64(v) % MOD)
		}
		return result
	}
	h := &stateHeap{}
	for i, v := range nums {
		*h = append(*h, stateItem{value: int64(v), index: i})
	}
	heap.Init(h)
	var top int64
	for _, v := range nums {
		if int64(v) > top {
			top = int64(v)
		}
	}
	// Simulate while the product stays within max(nums): every applied
	// value then lands at or below top, so top itself never grows and
	// each element is multiplied at most log2(top) times in this phase.
	for k > 0 && (*h)[0].value*int64(multiplier) <= top {
		entry := (*h)[0]
		entry.value *= int64(multiplier)
		(*h)[0] = entry
		heap.Fix(h, 0)
		k--
	}
	if k > 0 {
		// Crossover reached: multiplying the smallest now lifts it above
		// everything else, so later operations cycle through the entries
		// in non-decreasing (value, index) order. Each round scales all
		// n values by the multiplier, which preserves that inequality,
		// so the leftover k operations split into q full rounds plus one
		// extra exponent for the first rem entries of the sorted order.
		ordered := make([]stateItem, 0, len(*h))
		for _, item := range *h {
			ordered = append(ordered, item)
		}
		sort.Slice(ordered, func(a, b int) bool {
			if ordered[a].value != ordered[b].value {
				return ordered[a].value < ordered[b].value
			}
			return ordered[a].index < ordered[b].index
		})
		q := int64(k) / int64(n)
		rem := k % n
		for pos, item := range ordered {
			exponent := q
			if pos < rem {
				exponent++
			}
			result[item.index] = int(item.value % MOD * powMod(int64(multiplier), exponent, MOD) % MOD)
		}
	} else {
		for _, item := range *h {
			result[item.index] = int(item.value % MOD)
		}
	}
	return result
}

func powMod(base, exponent, mod int64) int64 {
	result := int64(1) % mod
	base %= mod
	for exponent > 0 {
		if exponent&1 == 1 {
			result = result * base % mod
		}
		base = base * base % mod
		exponent >>= 1
	}
	return result
}
