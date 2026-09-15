import "container/heap"

type state1439 struct {
	total   int
	indexes []int
}

type heap1439 []state1439

func (h heap1439) Len() int            { return len(h) }
func (h heap1439) Less(i, j int) bool  { return h[i].total < h[j].total }
func (h heap1439) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *heap1439) Push(x interface{}) { *h = append(*h, x.(state1439)) }
func (h *heap1439) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func kthSmallest(mat [][]int, k int) int {
	m := len(mat)
	first := make([]int, m)
	base := 0
	for r := 0; r < m; r++ {
		base += mat[r][0]
	}
	h := &heap1439{{base, first}}
	heap.Init(h)
	seen := map[string]bool{fmtKey(first): true}
	answer := 0
	for step := 0; step < k; step++ {
		top := heap.Pop(h).(state1439)
		answer = top.total
		for r := 0; r < m; r++ {
			if top.indexes[r]+1 < len(mat[r]) {
				candidate := make([]int, m)
				copy(candidate, top.indexes)
				candidate[r] = top.indexes[r] + 1
				key := fmtKey(candidate)
				if !seen[key] {
					seen[key] = true
					nextTotal := top.total - mat[r][top.indexes[r]] + mat[r][top.indexes[r]+1]
					heap.Push(h, state1439{nextTotal, candidate})
				}
			}
		}
	}
	return answer
}

func fmtKey(indexes []int) string {
	key := make([]byte, len(indexes))
	for i, v := range indexes {
		key[i] = byte(v)
	}
	return string(key)
}
