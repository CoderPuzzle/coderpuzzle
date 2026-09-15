function advantageCount(nums1: number[], nums2: number[]): number[] {
    const values: number[] = nums1.slice().sort((a, b) => a - b);
    const size = values.length;
    const tree: number[] = new Array(size + 1).fill(0);

    const update = (index: number, delta: number): void => {
        for (; index <= size; index += index & -index) {
            tree[index] += delta;
        }
    };
    const prefixCount = (index: number): number => {
        let total = 0;
        for (; index > 0; index -= index & -index) {
            total += tree[index];
        }
        return total;
    };
    const kthSmallest = (k: number): number => {
        let index = 0;
        let remaining = k;
        let step = 1;
        while (step < size) {
            step <<= 1;
        }
        while (step > 0) {
            const next = index + step;
            if (next <= size && tree[next] < remaining) {
                index = next;
                remaining -= tree[next];
            }
            step >>= 1;
        }
        return index + 1;
    };
    const upperBound = (value: number): number => {
        let lo = 0;
        let hi = size;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (values[mid] <= value) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    };

    for (let rank = 1; rank <= size; rank++) {
        update(rank, 1);
    }

    const result: number[] = [];
    for (const value of nums2) {
        const lessOrEqual = prefixCount(upperBound(value));
        let rank = kthSmallest(lessOrEqual + 1);
        if (rank > size) {
            rank = kthSmallest(1);
        }
        update(rank, -1);
        result.push(values[rank - 1]);
    }
    return result;
}
