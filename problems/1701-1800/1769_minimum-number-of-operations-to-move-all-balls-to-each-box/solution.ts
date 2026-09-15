function minOperations(boxes: string): number[] {
    // One ball hop between adjacent boxes costs 1, so gathering into
    // box i costs sum |i - j| over boxes j holding a ball. Sweeping
    // left to right, moving the gather point from i-1 to i adds one
    // step per ball at or left of i — so carry (count, ops) forward.
    const n = boxes.length;
    const answer: number[] = new Array(n).fill(0);
    let count = 0;
    let ops = 0;
    for (let i = 0; i < n; i++) {
        answer[i] += ops;
        count += boxes[i] === "1" ? 1 : 0;
        ops += count;
    }
    count = 0;
    ops = 0;
    for (let i = n - 1; i >= 0; i--) {
        answer[i] += ops;
        count += boxes[i] === "1" ? 1 : 0;
        ops += count;
    }
    return answer;
}
