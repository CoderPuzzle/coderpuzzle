function maximumSumQueries(nums1: number[], nums2: number[], queries: number[][]): number[] {
    const n = nums1.length;
    const points: number[][] = nums1.map((x, j) => [x, nums2[j]]);
    points.sort((a, b) => b[0] - a[0]);
    const order: number[] = queries.map((_, i) => i);
    order.sort((a, b) => queries[b][0] - queries[a][0]);

    const keys: number[] = [];
    const bests: number[] = [];

    function lowerBound(arr: number[], target: number): number {
        let low = 0;
        let high = arr.length;
        while (low < high) {
            const mid = (low + high) >> 1;
            if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }

    function insert(y: number, total: number): void {
        let pos = lowerBound(keys, y);
        if (pos < keys.length && keys[pos] === y) {
            if (bests[pos] >= total) {
                return;
            }
            keys.splice(pos, 1);
            bests.splice(pos, 1);
        }
        if (pos < keys.length && bests[pos] >= total) {
            return;
        }
        while (pos > 0 && bests[pos - 1] <= total) {
            keys.splice(pos - 1, 1);
            bests.splice(pos - 1, 1);
            pos--;
        }
        keys.splice(pos, 0, y);
        bests.splice(pos, 0, total);
    }

    const answer: number[] = new Array(queries.length).fill(-1);
    let pointIndex = 0;
    for (const qi of order) {
        const boundX = queries[qi][0];
        const boundY = queries[qi][1];
        while (pointIndex < n && points[pointIndex][0] >= boundX) {
            const x = points[pointIndex][0];
            const y = points[pointIndex][1];
            insert(y, x + y);
            pointIndex++;
        }
        const pos = lowerBound(keys, boundY);
        if (pos < keys.length) {
            answer[qi] = bests[pos];
        }
    }
    return answer;
}
