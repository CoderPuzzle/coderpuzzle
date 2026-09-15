package main

import "container/heap"

// A lazy-deletion max-priority queue: every priority update pushes a fresh
// entry, and pollHighest pops stale entries whose stored priority no longer
// matches the live map value. The heap orders by priority descending, then
// eventId ascending.
type heapEntry struct {
	priority int
	eventID  int
}

type priorityHeap []heapEntry

func (h priorityHeap) Len() int { return len(h) }
func (h priorityHeap) Less(i, j int) bool {
	return h[i].priority > h[j].priority || (h[i].priority == h[j].priority && h[i].eventID < h[j].eventID)
}
func (h priorityHeap) Swap(i, j int) { h[i], h[j] = h[j], h[i] }
func (h *priorityHeap) Push(x interface{}) {
	*h = append(*h, x.(heapEntry))
}
func (h *priorityHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

type EventManager struct {
	priority map[int]int
	heap     priorityHeap
}

func NewEventManagerTyped(events [][]int) *EventManager {
	manager := &EventManager{priority: make(map[int]int)}
	heap.Init(&manager.heap)
	for _, event := range events {
		manager.priority[event[0]] = event[1]
		heap.Push(&manager.heap, heapEntry{priority: event[1], eventID: event[0]})
	}
	return manager
}

func (design *EventManager) updatePriority(eventId int, newPriority int) {
	design.priority[eventId] = newPriority
	heap.Push(&design.heap, heapEntry{priority: newPriority, eventID: eventId})
}

func (design *EventManager) pollHighest() int {
	for design.heap.Len() > 0 {
		entry := heap.Pop(&design.heap).(heapEntry)
		if current, ok := design.priority[entry.eventID]; ok && current == entry.priority {
			delete(design.priority, entry.eventID)
			return entry.eventID
		}
	}
	return -1
}
