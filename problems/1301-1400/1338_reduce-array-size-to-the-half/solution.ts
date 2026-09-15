function minSetSize(arr: number[]): number {
    // A k-value set removes the sum of k frequencies; accumulate the largest
    // frequencies first until half the array is gone.
    const counts = new Map<number, number>();
    for (const value of arr) counts.set(value, (counts.get(value) || 0) + 1);
    const need = Math.ceil(arr.length / 2);
    const freqs = [...counts.values()].sort((a, b) => b - a);
    let removed = 0;
    for (let size = 1; size <= freqs.length; ++size) {
        removed += freqs[size - 1];
        if (removed >= need) return size;
    }
    return freqs.length;
}
