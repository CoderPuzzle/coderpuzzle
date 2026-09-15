// One queue, rotated on push: the front is always the stack top, so
// pop/top/empty are single queue operations on the front. The queue is a
// slice plus a head index — Go ships no queue type, and the statement allows
// simulating one with a list using only its standard operations.
type MyStack struct {
	queue []int
	head  int
}

func NewMyStackTyped() *MyStack {
	return &MyStack{}
}

func (design *MyStack) push(x int) {
	design.queue = append(design.queue, x)
	// Requeue everything that was below x, so x reaches the front.
	rotations := len(design.queue) - design.head - 1
	for i := 0; i < rotations; i++ {
		design.queue = append(design.queue, design.queue[design.head])
		design.head++
	}
}

func (design *MyStack) pop() int {
	value := design.queue[design.head]
	design.head++
	// Once fully drained the consumed prefix is dead; release it.
	if design.head == len(design.queue) {
		design.queue = design.queue[:0]
		design.head = 0
	}
	return value
}

func (design *MyStack) top() int {
	return design.queue[design.head]
}

func (design *MyStack) empty() bool {
	return design.head == len(design.queue)
}
