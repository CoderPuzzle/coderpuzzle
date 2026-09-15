import "container/heap"
import "sort"

type intHeap []int

func (h intHeap) Len() int            { return len(h) }
func (h intHeap) Less(i, j int) bool  { return h[i] < h[j] }
func (h intHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *intHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *intHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

type FileSharing struct {
	chunks map[int]map[int]bool
	alive  map[int]bool
	freed  *intHeap
	nextID int
}

func NewFileSharingTyped(m int) *FileSharing {
	h := &intHeap{}
	heap.Init(h)
	return &FileSharing{chunks: make(map[int]map[int]bool), alive: make(map[int]bool), freed: h, nextID: 1}
}

func (design *FileSharing) join(ownedChunks []int) int {
	var uid int
	if len(*design.freed) > 0 {
		uid = heap.Pop(design.freed).(int)
	} else {
		uid = design.nextID
		design.nextID++
	}
	set := make(map[int]bool, len(ownedChunks))
	for _, c := range ownedChunks {
		set[c] = true
	}
	design.chunks[uid] = set
	design.alive[uid] = true
	return uid
}

func (design *FileSharing) leave(userID int) {
	delete(design.chunks, userID)
	delete(design.alive, userID)
	heap.Push(design.freed, userID)
}

func (design *FileSharing) request(userID int, chunkID int) []int {
	owners := []int{}
	for uid := range design.alive {
		if design.chunks[uid][chunkID] {
			owners = append(owners, uid)
		}
	}
	sort.Ints(owners)
	if len(owners) > 0 {
		design.chunks[userID][chunkID] = true
	}
	return owners
}
