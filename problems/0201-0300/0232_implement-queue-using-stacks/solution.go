// Two stacks, transferred lazily: the in stack holds new arrivals, the
// out stack serves the front once the reversal has happened. Each stack is
// a slice used only at its tail — Go ships no stack type, and the statement
// allows simulating one with a list using only its standard operations.
type MyQueue struct {
	inStack  []int // tail = newest push
	outStack []int // tail = oldest element (queue front)
}

func NewMyQueueTyped() *MyQueue {
	return &MyQueue{}
}

func (design *MyQueue) push(x int) {
	design.inStack = append(design.inStack, x)
}

func (design *MyQueue) pop() int {
	design.transferIfNeeded()
	top := len(design.outStack) - 1
	value := design.outStack[top]
	design.outStack = design.outStack[:top]
	return value
}

func (design *MyQueue) peek() int {
	design.transferIfNeeded()
	return design.outStack[len(design.outStack)-1]
}

func (design *MyQueue) empty() bool {
	return len(design.inStack) == 0 && len(design.outStack) == 0
}

func (design *MyQueue) transferIfNeeded() {
	// Only when the out stack is dry; pushing onto leftovers would put
	// newcomers ahead of them. The reversal parks the oldest element on
	// the tail of the out stack.
	if len(design.outStack) > 0 {
		return
	}
	for len(design.inStack) > 0 {
		top := len(design.inStack) - 1
		design.outStack = append(design.outStack, design.inStack[top])
		design.inStack = design.inStack[:top]
	}
}
