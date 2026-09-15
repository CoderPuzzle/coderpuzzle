function sumOfNumberAndReverse(num: number): boolean {
    // Hint 1 is the whole story: the domain of candidates x with
    // 0 <= x <= num holds at most 100001 values, so a direct scan
    // settles every input. Each trial reverses x arithmetically --
    // leading zeros need no special case, since they simply add
    // nothing ("041" contributes 41). The sum x + rev(x) is at most
    // 2 * 10^5 < 2^53, so every value stays an exact double.
    for (let x = 0; x <= num; x++) {
        let reversed = 0;
        for (let v = x; v > 0; v = Math.floor(v / 10)) {
            reversed = reversed * 10 + (v % 10);
        }
        if (x + reversed === num) {
            return true;
        }
    }
    return false;
}
