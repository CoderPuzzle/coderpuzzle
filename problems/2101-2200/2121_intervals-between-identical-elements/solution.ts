function getDistances(arr: number[]): number[] {
    const answer = new Array<number>(arr.length).fill(0);
    let counts = new Map<number, number>();
    let sums = new Map<number, number>();
    for (let index = 0; index < arr.length; index++) {
        const value = arr[index];
        answer[index] += index * (counts.get(value) ?? 0) - (sums.get(value) ?? 0);
        counts.set(value, (counts.get(value) ?? 0) + 1);
        sums.set(value, (sums.get(value) ?? 0) + index);
    }
    counts = new Map();
    sums = new Map();
    for (let index = arr.length - 1; index >= 0; index--) {
        const value = arr[index];
        answer[index] += (sums.get(value) ?? 0) - index * (counts.get(value) ?? 0);
        counts.set(value, (counts.get(value) ?? 0) + 1);
        sums.set(value, (sums.get(value) ?? 0) + index);
    }
    return answer;
}
