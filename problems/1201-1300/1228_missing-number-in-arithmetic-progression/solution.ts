function missingNumber(arr: number[]): number {
    // Endpoints survive, so the full progression had arr.length+1 terms from
    // arr[0] to arr[-1]; the gap between its Gauss sum and the surviving
    // sum is the removed value.
    const n = arr.length;
    const full = ((arr[0] + arr[n - 1]) * (n + 1)) / 2;
    let sum = 0;
    for (const value of arr) sum += value;
    return full - sum;
}
