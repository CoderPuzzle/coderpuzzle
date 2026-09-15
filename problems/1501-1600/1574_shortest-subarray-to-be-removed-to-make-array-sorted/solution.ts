function findLengthOfShortestSubarray(arr: number[]): number {
    const n = arr.length;
    // Longest non-decreasing prefix: arr[0..left] is sorted.
    let left = 0;
    while (left + 1 < n && arr[left] <= arr[left + 1]) left++;
    if (left === n - 1) return 0;
    // Longest non-decreasing suffix: arr[right..n-1] is sorted.
    let right = n - 1;
    while (right > 0 && arr[right - 1] <= arr[right]) right--;
    // Removing everything after the prefix, or everything before the
    // suffix, are always valid — they bound the answer from the start.
    let result = Math.min(n - left - 1, right);
    // Two-pointer merge: i walks the sorted prefix, j walks the sorted
    // suffix. Both prefix and suffix are individually non-decreasing, so as
    // i advances the smallest valid j never decreases — a classic
    // merge-step invariant, giving O(left + (n - right)) total work.
    let i = 0;
    let j = right;
    while (i <= left && j < n) {
        if (arr[i] <= arr[j]) {
            // Keeping arr[0..i] and arr[j..n-1] merges into a sorted array;
            // everything strictly between them is removed.
            result = Math.min(result, j - i - 1);
            i++;
        } else {
            j++;
        }
    }
    return result;
}
