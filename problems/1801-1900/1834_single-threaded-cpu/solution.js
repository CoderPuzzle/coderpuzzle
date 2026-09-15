/**
 * @param {number[][]} tasks
 * @return {number[]}
 */
var getOrder = function (tasks) {
    var n = tasks.length;
    var byEnqueue = [];
    for (var i = 0; i < n; i++) byEnqueue.push(i);
    // Indices pre-sorted by (enqueueTime, index): the arrival stream only moves forward.
    byEnqueue.sort(function (a, b) {
        if (tasks[a][0] !== tasks[b][0]) return tasks[a][0] - tasks[b][0];
        return a - b;
    });
    // Min-heap of [processingTime, index] pairs.
    var heap = [];
    function push(item) {
        heap.push(item);
        var i = heap.length - 1;
        while (i > 0) {
            var p = (i - 1) >> 1;
            if (less(heap[i], heap[p])) {
                var t = heap[i];
                heap[i] = heap[p];
                heap[p] = t;
                i = p;
            } else {
                break;
            }
        }
    }
    function pop() {
        var top = heap[0];
        var last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            var i = 0;
            while (true) {
                var l = 2 * i + 1,
                    r = 2 * i + 2,
                    m = i;
                if (l < heap.length && less(heap[l], heap[m])) m = l;
                if (r < heap.length && less(heap[r], heap[m])) m = r;
                if (m === i) break;
                var t = heap[i];
                heap[i] = heap[m];
                heap[m] = t;
                i = m;
            }
        }
        return top;
    }
    function less(a, b) {
        if (a[0] !== b[0]) return a[0] < b[0];
        return a[1] < b[1];
    }
    var order = [];
    var time = 0;
    var i = 0;
    while (i < n || heap.length > 0) {
        if (heap.length === 0) {
            // CPU idle: jump straight to the next arrival instead of ticking.
            time = Math.max(time, tasks[byEnqueue[i]][0]);
        }
        // Enqueue everything available at this instant BEFORE popping, so all
        // contenders compete under the same (processingTime, index) order.
        while (i < n && tasks[byEnqueue[i]][0] <= time) {
            var j = byEnqueue[i];
            push([tasks[j][1], j]);
            i += 1;
        }
        var item = pop(); // winner: shortest processing time, smallest index on ties
        order.push(item[1]);
        time += item[0]; // clock advances by exactly the winner's duration
    }
    return order;
};
