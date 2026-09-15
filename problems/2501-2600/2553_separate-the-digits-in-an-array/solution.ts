// Strip each value's digits by division into a small buffer and flush it
// reversed: numbers keep their reading order while digits lift low-first.
// Values reach 10^5, so a six-slot buffer suffices.
function separateDigits(nums: number[]): number[] {
    const out: number[] = [];
    const buf: number[] = new Array(6).fill(0);
    for (const x of nums) {
        let t = 0;
        for (let v = x; v > 0; v = Math.floor(v / 10)) {
            buf[t++] = v % 10;
        }
        while (t > 0) {
            out.push(buf[--t]);
        }
    }
    return out;
}
