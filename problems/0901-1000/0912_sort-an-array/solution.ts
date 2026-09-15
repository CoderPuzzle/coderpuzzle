// Bottom-up merge sort: no recursion and no library sort. A pass at width w
// merges every pair of adjacent sorted runs of length w from source into
// buffer, doubling the sorted-run length each pass; after ceil(log2 n) passes
// the whole array is one sorted run. The merge takes from the left run on
// ties, so equal values keep their relative order — the sort is stable.
function sortArray(nums: number[]): number[] {
    const n = nums.length;
    let source = nums.slice();
    let buffer: number[] = new Array(n);
    for (let width = 1; width < n; width *= 2) {
        for (let start = 0; start < n; start += width * 2) {
            const middle = Math.min(start + width, n);
            const end = Math.min(start + width * 2, n);
            let i = start;
            let j = middle;
            let k = start;
            while (i < middle && j < end) {
                if (source[j] < source[i]) {
                    buffer[k++] = source[j++];
                } else {
                    buffer[k++] = source[i++];
                }
            }
            while (i < middle) {
                buffer[k++] = source[i++];
            }
            while (j < end) {
                buffer[k++] = source[j++];
            }
        }
        const swapped = source;
        source = buffer;
        buffer = swapped;
    }
    return source;
}
