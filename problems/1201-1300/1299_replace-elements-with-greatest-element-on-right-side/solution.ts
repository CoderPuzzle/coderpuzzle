function replaceElements(arr: number[]): number[] {
    // Sweep right to left: answer[i] is the max seen strictly right of i,
    // which the running maximum holds before arr[i] joins it.
    const answer: number[] = new Array(arr.length).fill(-1);
    let runningMax = -1;
    for (let i = arr.length - 1; i >= 0; --i) {
        answer[i] = runningMax;
        if (arr[i] > runningMax) runningMax = arr[i];
    }
    return answer;
}
