function subStrHash(s: string, power: number, modulo: number, k: number, hashValue: number): string {
    const n = s.length;
    const val = (i: number): number => s.charCodeAt(i) - 96;

    // Hash of the rightmost window, then roll leftwards.
    let cur = 0;
    let pw = 1;
    for (let j = 0; j < k; j++) {
        cur = (cur + val(n - k + j) * pw) % modulo;
        pw = (pw * power) % modulo;
    }
    let top = 1;
    for (let j = 0; j < k - 1; j++) {
        top = (top * power) % modulo;
    }
    let answer = cur === hashValue ? s.slice(n - k) : "";
    for (let i = n - k - 1; i >= 0; i--) {
        cur = (((cur - ((val(i + k) * top) % modulo) + modulo) % modulo) * power + val(i)) % modulo;
        if (cur === hashValue) {
            answer = s.slice(i, i + k); // scanning right-to-left keeps the leftmost match
        }
    }
    return answer;
}
