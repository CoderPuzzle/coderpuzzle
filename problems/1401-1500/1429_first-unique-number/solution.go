type FirstUnique struct {
	counts map[int64]int
	queue  []int64
}

func NewFirstUniqueTyped(nums []int64) *FirstUnique {
	design := &FirstUnique{counts: make(map[int64]int, len(nums)), queue: make([]int64, 0, len(nums))}
	for _, value := range nums {
		design.add(value)
	}
	return design
}

func (design *FirstUnique) showFirstUnique() int64 {
	for len(design.queue) > 0 && design.counts[design.queue[0]] > 1 {
		design.queue = design.queue[1:]
	}
	if len(design.queue) == 0 {
		return -1
	}
	return design.queue[0]
}

func (design *FirstUnique) add(value int64) {
	design.counts[value]++
	design.queue = append(design.queue, value)
}
