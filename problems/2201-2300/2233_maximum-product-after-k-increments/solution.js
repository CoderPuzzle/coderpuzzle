/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumProduct = function (nums, k) {
    // Hand-rolled binary min-heap; every stored value stays <= 1e6 + 1e5,
    // far below 2^53, so plain numbers are exact. The final product is
    // reduced mod 1e9+7 at each multiply; each factor < 1e9+7 keeps the
    // intermediate product below 2^53.
    const heap = nums.slice();
    const siftDown = (start) => {
        let index = start;
        for (;;) {
            const left = 2 * index + 1;
            const right = left + 1;
            let smallest = index;
            if (left < heap.length && heap[left] < heap[smallest]) {
                smallest = left;
            }
            if (right < heap.length && heap[right] < heap[smallest]) {
                smallest = right;
            }
            if (smallest === index) {
                return;
            }
            [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
            index = smallest;
        }
    };
    for (let i = (heap.length >> 1) - 1; i >= 0; i--) {
        siftDown(i);
    }
    for (let step = 0; step < k; step++) {
        const smallest = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            siftDown(0);
            // reinsert smallest+1 from the top
            heap.push(0);
            let index = heap.length - 1;
            while (index > 0) {
                const parent = (index - 1) >> 1;
                if (heap[parent] <= smallest + 1) {
                    break;
                }
                heap[index] = heap[parent];
                index = parent;
            }
            heap[index] = smallest + 1;
        } else {
            heap.push(smallest + 1);
        }
    }
    let product = 1;
    for (const value of heap) {
        product = (product * value) % 1000000007;
    }
    return product;
};
