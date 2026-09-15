// Problem-provided oracle (ImmutableListNode), JavaScript side. Evaluated
// with every submission by the judge; never editable in the editor.
// Constructed from the case state: the serialized linked list (generic
// value) and the query budget. The chain is wired at construction and
// this object IS the head handed to the solution.
class ImmutableListNode {
    constructor(construction, budget) {
        const raw = String(construction[0] ?? "");
        const values = raw.length > 0 ? raw.split(",").map((part) => parseInt(part, 10)) : [];
        this.value = values.length > 0 ? values[0] : 0;
        this.budget = Number(budget);
        this.printed = [];
        // Wire the chain from the tail inward; this object stays the head.
        // Chained nodes carry budget = Infinity so only the head's budget
        // is spent, and they share the head's transcript array.
        let tail = null;
        for (let i = values.length - 1; i >= 1; --i) {
            const node = Object.create(ImmutableListNode.prototype);
            node.value = values[i];
            node.next = tail;
            node.printed = this.printed;
            node.budget = Infinity;
            tail = node;
        }
        this.next = tail;
    }

    // Records the current node's value into the judged transcript.
    printValue() {
        if (!(this.budget > 0)) {
            throw new Error("ImmutableListNode query budget exhausted");
        }
        this.budget -= 1;
        this.printed.push(this.value);
    }

    // Returns the next node, or null past the end of the list.
    getNext() {
        return this.next;
    }

    // The observable effect: the exact sequence of printed values. Only
    // meaningful on the head, whose printed array every node shares.
    verdict() {
        return [...this.printed];
    }
}
