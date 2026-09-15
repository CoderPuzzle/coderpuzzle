// The generator yields arr[startIndex] on the first (parameterless)
// resume, then hands control back with the sent-in jump and repeats: the
// double modulo maps any signed jump onto the ring, because JavaScript's
// % keeps the dividend's sign — ((index + jump) % n + n) % n lands in
// [0, n) whether the jump is negative, zero, or larger than the array.
// The loop never terminates: an infinite walk is the contract, and the
// case driver decides when enough values have been observed.
function* cycleGenerator(arr: number[], startIndex: number): Generator<number, void, number> {
    let index = startIndex;
    let jump = yield arr[index];

    while (true) {
        index = (((index + jump) % arr.length) + arr.length) % arr.length;
        jump = yield arr[index];
    }
}

class Solution {
    run(cycleCase: CycleCase): void {
        cycleCase.drive(cycleGenerator);
    }
}
