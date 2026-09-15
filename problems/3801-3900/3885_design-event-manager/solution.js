// A lazy-deletion max-priority queue: every priority update pushes a fresh
// entry, and pollHighest pops stale entries whose stored priority no longer
// matches the live map value. The heap stores [-priority, eventId] with a
// min-heap ordering, so the top is always the highest priority with the
// smallest eventId on ties.
class EventManager {
    constructor(events) {
        this.priority = new Map();
        this.heap = [];
        for (const [eventId, prio] of events) {
            this.priority.set(eventId, prio);
            this.push(-prio, eventId);
        }
    }

    push(negPriority, eventId) {
        const heap = this.heap;
        heap.push([negPriority, eventId]);
        let index = heap.length - 1;
        while (index > 0) {
            const parent = (index - 1) >> 1;
            if (
                heap[parent][0] < heap[index][0] ||
                (heap[parent][0] === heap[index][0] && heap[parent][1] < heap[index][1])
            )
                break;
            [heap[parent], heap[index]] = [heap[index], heap[parent]];
            index = parent;
        }
    }

    pop() {
        const heap = this.heap;
        const top = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            let index = 0;
            for (;;) {
                const left = 2 * index + 1;
                const right = 2 * index + 2;
                let smallest = index;
                if (
                    left < heap.length &&
                    (heap[left][0] < heap[smallest][0] ||
                        (heap[left][0] === heap[smallest][0] && heap[left][1] < heap[smallest][1]))
                ) {
                    smallest = left;
                }
                if (
                    right < heap.length &&
                    (heap[right][0] < heap[smallest][0] ||
                        (heap[right][0] === heap[smallest][0] && heap[right][1] < heap[smallest][1]))
                ) {
                    smallest = right;
                }
                if (smallest === index) break;
                [heap[smallest], heap[index]] = [heap[index], heap[smallest]];
                index = smallest;
            }
        }
        return top;
    }

    updatePriority(eventId, newPriority) {
        this.priority.set(eventId, newPriority);
        this.push(-newPriority, eventId);
    }

    pollHighest() {
        while (this.heap.length > 0) {
            const [negPriority, eventId] = this.pop();
            if (this.priority.get(eventId) === -negPriority) {
                this.priority.delete(eventId);
                return eventId;
            }
        }
        return -1;
    }
}
