function maximumBeauty(items: number[][], queries: number[]): number[] {
    items.sort((left, right) => left[0] - right[0]);
    const prefixBeauty = new Array<number>(items.length);
    let best = 0;
    for (let index = 0; index < items.length; index++) {
        best = Math.max(best, items[index][1]);
        prefixBeauty[index] = best;
    }

    return queries.map((query) => {
        let low = 0;
        let high = items.length;
        while (low < high) {
            const middle = low + Math.floor((high - low) / 2);
            if (items[middle][0] <= query) {
                low = middle + 1;
            } else {
                high = middle;
            }
        }
        return low === 0 ? 0 : prefixBeauty[low - 1];
    });
}
