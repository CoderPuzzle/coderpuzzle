// Heap candidate: the stored tuple is (-priority, -jobId, userId), so the
// minimum entry is the highest priority, tie-broken by the highest jobId.
class BoardEntry {
    constructor(negativePriority, negativeJob, userId) {
        this.negativePriority = negativePriority;
        this.negativeJob = negativeJob;
        this.userId = userId;
    }
}

// Live records by jobId plus a lazily deleted min-heap of candidates: an
// entry is still valid only when its priority matches the record's
// current priority.
class TaskManager {
    constructor(jobs) {
        this.jobs = new Map(); // jobId -> [priority, userId]
        this.heap = [];
        for (const [userId, jobId, priority] of jobs) {
            this.jobs.set(jobId, [priority, userId]);
            this.pushEntry(new BoardEntry(-priority, -jobId, userId));
        }
    }

    less(a, b) {
        if (a.negativePriority !== b.negativePriority) {
            return a.negativePriority < b.negativePriority;
        }
        if (a.negativeJob !== b.negativeJob) {
            return a.negativeJob < b.negativeJob;
        }
        return a.userId < b.userId;
    }

    pushEntry(entry) {
        this.heap.push(entry);
        let index = this.heap.length - 1;
        while (index > 0) {
            const parent = (index - 1) >> 1;
            if (!this.less(this.heap[index], this.heap[parent])) {
                break;
            }
            [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
            index = parent;
        }
    }

    popEntry() {
        const top = this.heap[0];
        const last = this.heap.length - 1;
        this.heap[0] = this.heap[last];
        this.heap.length = last;
        let index = 0;
        for (;;) {
            const left = 2 * index + 1;
            if (left >= last) {
                break;
            }
            let best = left;
            const right = left + 1;
            if (right < last && this.less(this.heap[right], this.heap[left])) {
                best = right;
            }
            if (!this.less(this.heap[best], this.heap[index])) {
                break;
            }
            [this.heap[index], this.heap[best]] = [this.heap[best], this.heap[index]];
            index = best;
        }
        return top;
    }

    add(userId, jobId, priority) {
        this.jobs.set(jobId, [priority, userId]);
        this.pushEntry(new BoardEntry(-priority, -jobId, userId));
    }

    edit(jobId, newPriority) {
        const userId = this.jobs.get(jobId)[1];
        this.jobs.set(jobId, [newPriority, userId]);
        this.pushEntry(new BoardEntry(-newPriority, -jobId, userId));
    }

    rmv(jobId) {
        this.jobs.delete(jobId);
    }

    execTop() {
        while (this.heap.length > 0) {
            const top = this.heap[0];
            const record = this.jobs.get(-top.negativeJob);
            if (record !== undefined && record[0] === -top.negativePriority) {
                this.popEntry();
                this.jobs.delete(-top.negativeJob);
                return top.userId;
            }
            this.popEntry();
        }
        return -1;
    }
}
