function countEven(num: number): number {
    // num <= 1000, so checking every value's digit sum directly is the
    // whole story.
    let count = 0;
    for (let value = 1; value <= num; ++value) {
        let digitSum = 0;
        for (let rest = value; rest > 0; rest = Math.floor(rest / 10)) {
            digitSum += rest % 10;
        }
        if (digitSum % 2 === 0) {
            ++count;
        }
    }
    return count;
}
