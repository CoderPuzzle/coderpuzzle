class Solution {

    public int[] sortArray(int[] nums) {
        // Bottom-up merge sort: no recursion and no library sort. A pass at
        // width w merges every pair of adjacent sorted runs of length w from
        // source into buffer, doubling the sorted-run length each pass; after
        // ceil(log2 n) passes the whole array is one sorted run. The merge
        // takes from the left run on ties, so equal values keep their
        // relative order — the sort is stable.
        int n = nums.length;
        int[] source = nums.clone();
        int[] buffer = new int[n];
        for (int width = 1; width < n; width *= 2) {
            for (int start = 0; start < n; start += width * 2) {
                int middle = Math.min(start + width, n);
                int end = Math.min(start + width * 2, n);
                int i = start;
                int j = middle;
                int k = start;
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
            int[] swap = source;
            source = buffer;
            buffer = swap;
        }
        return source;
    }
}
