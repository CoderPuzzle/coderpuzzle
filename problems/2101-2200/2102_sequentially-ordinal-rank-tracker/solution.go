import "container/heap"

type sorLocation struct {
	name  string
	score int
}

type sorWorstHeap []sorLocation

func (h sorWorstHeap) Len() int      { return len(h) }
func (h sorWorstHeap) Swap(i, j int) { h[i], h[j] = h[j], h[i] }
func (h sorWorstHeap) Less(i, j int) bool {
	if h[i].score != h[j].score {
		return h[i].score < h[j].score
	}
	return h[i].name > h[j].name
}
func (h *sorWorstHeap) Push(value interface{}) {
	*h = append(*h, value.(sorLocation))
}
func (h *sorWorstHeap) Pop() interface{} {
	old := *h
	last := old[len(old)-1]
	*h = old[:len(old)-1]
	return last
}

type sorBestHeap []sorLocation

func (h sorBestHeap) Len() int      { return len(h) }
func (h sorBestHeap) Swap(i, j int) { h[i], h[j] = h[j], h[i] }
func (h sorBestHeap) Less(i, j int) bool {
	if h[i].score != h[j].score {
		return h[i].score > h[j].score
	}
	return h[i].name < h[j].name
}
func (h *sorBestHeap) Push(value interface{}) {
	*h = append(*h, value.(sorLocation))
}
func (h *sorBestHeap) Pop() interface{} {
	old := *h
	last := old[len(old)-1]
	*h = old[:len(old)-1]
	return last
}

type SORTracker struct {
	prefix    sorWorstHeap
	remaining sorBestHeap
}

func NewSORTrackerTyped() *SORTracker {
	return &SORTracker{}
}

func (design *SORTracker) add(name string, score int) {
	heap.Push(&design.prefix, sorLocation{name, score})
	moved := heap.Pop(&design.prefix).(sorLocation)
	heap.Push(&design.remaining, moved)
}

func (design *SORTracker) get() string {
	moved := heap.Pop(&design.remaining).(sorLocation)
	heap.Push(&design.prefix, moved)
	return design.prefix[0].name
}
