// Two stacks, transferred lazily: the in stack holds new arrivals, the
// out stack serves the front once the reversal has happened. Each stack is
// an array used only at its top end — JavaScript ships no stack type, and
// the statement allows simulating one with a list.
class MyQueue {
    constructor() {
        this.inStack = [];
        this.outStack = [];
    }

    push(x) {
        this.inStack.push(x);
    }

    pop() {
        this.transferIfNeeded();
        return this.outStack.pop();
    }

    peek() {
        this.transferIfNeeded();
        return this.outStack[this.outStack.length - 1];
    }

    empty() {
        return this.inStack.length === 0 && this.outStack.length === 0;
    }

    transferIfNeeded() {
        // Only when the out stack is dry; pushing onto leftovers would put
        // newcomers ahead of them. The reversal parks the oldest element
        // on top of the out stack.
        if (this.outStack.length === 0) {
            while (this.inStack.length > 0) this.outStack.push(this.inStack.pop());
        }
    }
}
