function countElements(nums: number[], k: number): number {
    // Sorting lines every element up with its rank: the elements strictly
    // greater than a value are exactly the sorted suffix after that
    // value's run. The whole count hangs on one threshold, the value at
    // sorted index t = n - k - 1.
    const ordered = [...nums].sort((a, b) => a - b);
    const n = ordered.length;
    const threshold = ordered[n - k - 1];
    // Elements strictly below the threshold all qualify: their runs end
    // before it. The run AT the threshold qualifies only when its last
    // member still sees >= k strictly greater values, i.e. the run ends
    // at or before t. Values above the threshold never qualify.
    let left = 0;
    while (ordered[left] < threshold) left++;
    let right = left;
    while (right < n && ordered[right] === threshold) right++;
    return n - right >= k ? right : left;
}
