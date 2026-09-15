function maxBoxesInWarehouse(boxes: number[], warehouse: number[]): number {
    // A box can enter from either side, so room i only has to survive
    // whichever path is more forgiving: the prefix minimum coming from the
    // left, or the suffix minimum coming from the right.
    const n = warehouse.length;
    const prefixMin: number[] = new Array(n);
    let running = warehouse[0];
    for (let i = 0; i < n; i++) {
        running = Math.min(running, warehouse[i]);
        prefixMin[i] = running;
    }

    const suffixMin: number[] = new Array(n);
    running = warehouse[n - 1];
    for (let i = n - 1; i >= 0; i--) {
        running = Math.min(running, warehouse[i]);
        suffixMin[i] = running;
    }

    const effective: number[] = new Array(n);
    for (let i = 0; i < n; i++) {
        effective[i] = Math.max(prefixMin[i], suffixMin[i]);
    }

    // effective is no longer monotonic, so sort both sides and sweep with
    // two pointers: the smallest remaining box is the best fit for the
    // smallest remaining room capacity.
    effective.sort((a, b) => a - b);
    const sortedBoxes = [...boxes].sort((a, b) => a - b);
    let placed = 0;
    let j = 0;
    for (let i = 0; i < n; i++) {
        if (j >= sortedBoxes.length) break;
        if (sortedBoxes[j] <= effective[i]) {
            placed++;
            j++;
        }
    }
    return placed;
}
