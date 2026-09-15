function calPoints(operations: string[]): number {
    // Every operation only ever touches the end of the record: a literal
    // pushes, the double and the sum read the last entry (or the last two)
    // and push, the cancel pops. Replaying the operations left to right on
    // a stack is therefore the whole computation, and the answer is the sum
    // of what is left — 0 when the record ends empty.
    const record: number[] = [];
    for (const op of operations) {
        if (op === "+") {
            record.push(record[record.length - 1] + record[record.length - 2]);
        } else if (op === "D") {
            record.push(2 * record[record.length - 1]);
        } else if (op === "C") {
            record.pop();
        } else {
            record.push(Number(op));
        }
    }
    let total = 0;
    for (const score of record) {
        total += score;
    }
    return total;
}
