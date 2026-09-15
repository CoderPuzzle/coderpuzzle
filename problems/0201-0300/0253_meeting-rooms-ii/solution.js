/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function (intervals) {
    if (intervals.length === 0) return 0;
    const sorted = intervals.slice().sort((a, b) => a[0] - b[0]);
    const heap = []; // min-heap of end times of ongoing meetings
    const push = (v) => {
        heap.push(v);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p] <= heap[i]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = () => {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                let smallest = i;
                const l = 2 * i + 1,
                    r = 2 * i + 2;
                if (l < heap.length && heap[l] < heap[smallest]) smallest = l;
                if (r < heap.length && heap[r] < heap[smallest]) smallest = r;
                if (smallest === i) break;
                [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
                i = smallest;
            }
        }
        return top;
    };
    for (const [start, end] of sorted) {
        if (heap.length && heap[0] <= start) {
            pop();
            push(end);
        } else {
            push(end);
        }
    }
    return heap.length;
};
