package main

// boardEntry is one heap candidate: the stored tuple is
// (-priority, -jobId, userId), so the minimum entry is the highest
// priority, tie-broken by the highest jobId (Python tuple order).
type boardEntry struct {
	negativePriority int
	negativeJob      int
	userId           int
}

// entryHeap is a hand-rolled binary min-heap over entries (the design
// wrapper assembles one source file, so the submission cannot import
// container/heap).
type entryHeap []boardEntry

func (heap entryHeap) less(i int, j int) bool {
	a, b := heap[i], heap[j]
	if a.negativePriority != b.negativePriority {
		return a.negativePriority < b.negativePriority
	}
	if a.negativeJob != b.negativeJob {
		return a.negativeJob < b.negativeJob
	}
	return a.userId < b.userId
}

func (heap *entryHeap) push(entry boardEntry) {
	*heap = append(*heap, entry)
	index := len(*heap) - 1
	for index > 0 {
		parent := (index - 1) / 2
		if !heap.less(index, parent) {
			break
		}
		(*heap)[index], (*heap)[parent] = (*heap)[parent], (*heap)[index]
		index = parent
	}
}

func (heap *entryHeap) pop() boardEntry {
	top := (*heap)[0]
	last := len(*heap) - 1
	(*heap)[0] = (*heap)[last]
	*heap = (*heap)[:last]
	index := 0
	for {
		left := 2*index + 1
		if left >= last {
			break
		}
		best := left
		if right := left + 1; right < last && heap.less(right, left) {
			best = right
		}
		if !heap.less(best, index) {
			break
		}
		(*heap)[index], (*heap)[best] = (*heap)[best], (*heap)[index]
		index = best
	}
	return top
}

// TaskManager keeps the live records by jobId plus a lazily deleted max-heap
// of candidates: an entry is still valid only when its priority matches
// the record's current priority.
type TaskManager struct {
	jobs map[int][2]int // jobId -> {priority, userId}
	heap entryHeap
}

func NewTaskManagerTyped(jobs [][]int) *TaskManager {
	board := &TaskManager{jobs: make(map[int][2]int, len(jobs))}
	for _, job := range jobs {
		userId, jobId, priority := job[0], job[1], job[2]
		board.jobs[jobId] = [2]int{priority, userId}
		board.heap.push(boardEntry{negativePriority: -priority, negativeJob: -jobId, userId: userId})
	}
	return board
}

func (design *TaskManager) add(userId int, jobId int, priority int) {
	design.jobs[jobId] = [2]int{priority, userId}
	design.heap.push(boardEntry{negativePriority: -priority, negativeJob: -jobId, userId: userId})
}

func (design *TaskManager) edit(jobId int, newPriority int) {
	userId := design.jobs[jobId][1]
	design.jobs[jobId] = [2]int{newPriority, userId}
	design.heap.push(boardEntry{negativePriority: -newPriority, negativeJob: -jobId, userId: userId})
}

func (design *TaskManager) rmv(jobId int) {
	delete(design.jobs, jobId)
}

func (design *TaskManager) execTop() int {
	for len(design.heap) > 0 {
		top := design.heap[0]
		record, exists := design.jobs[-top.negativeJob]
		if exists && record[0] == -top.negativePriority {
			design.heap.pop()
			delete(design.jobs, -top.negativeJob)
			return top.userId
		}
		design.heap.pop()
	}
	return -1
}
