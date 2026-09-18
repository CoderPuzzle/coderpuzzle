package main

type packetKey struct {
	source      int
	destination int
	timestamp   int
}

type Router struct {
	limit int
	// three parallel views of the stored packets: FIFO order, duplicate
	// detection, and an append-only timestamp log per destination
	queue      [][3]int
	stored     map[packetKey]bool
	timestamps map[int][]int
	heads      map[int]int
}

func NewRouterTyped(capacity int) *Router {
	return &Router{
		limit:      capacity,
		stored:     make(map[packetKey]bool),
		timestamps: make(map[int][]int),
		heads:      make(map[int]int),
	}
}

func (design *Router) addPacket(source int, destination int, timestamp int) bool {
	packet := packetKey{source: source, destination: destination, timestamp: timestamp}
	if design.stored[packet] {
		return false
	}
	if len(design.queue) == design.limit {
		// the oldest packet leaves all three views; its log entry is only
		// abandoned past the head, never shifted out of the list
		oldest := design.queue[0]
		design.queue = design.queue[1:]
		delete(design.stored, packetKey{source: oldest[0], destination: oldest[1], timestamp: oldest[2]})
		design.heads[oldest[1]]++
	}
	design.queue = append(design.queue, [3]int{source, destination, timestamp})
	design.stored[packet] = true
	design.timestamps[destination] = append(design.timestamps[destination], timestamp)
	if _, exists := design.heads[destination]; !exists {
		design.heads[destination] = 0
	}
	return true
}

func (design *Router) forwardPacket() []int {
	if len(design.queue) == 0 {
		return []int{}
	}
	// forwarding hands over the oldest packet and drops it from every view
	oldest := design.queue[0]
	design.queue = design.queue[1:]
	delete(design.stored, packetKey{source: oldest[0], destination: oldest[1], timestamp: oldest[2]})
	design.heads[oldest[1]]++
	return []int{oldest[0], oldest[1], oldest[2]}
}

func (design *Router) getCount(destination int, startTime int, endTime int) int {
	times := design.timestamps[destination]
	if times == nil {
		return 0
	}
	// adds arrive with non-decreasing timestamps, so each log is sorted
	// for free and the live entries are the suffix [head, len)
	head := design.heads[destination]
	low, high := head, len(times)
	for low < high {
		middle := (low + high) / 2
		if times[middle] < startTime {
			low = middle + 1
		} else {
			high = middle
		}
	}
	first := low
	low, high = head, len(times)
	for low < high {
		middle := (low + high) / 2
		if times[middle] <= endTime {
			low = middle + 1
		} else {
			high = middle
		}
	}
	return low - first
}
