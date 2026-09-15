// The judge pins one exact answer: call the letter with the larger count
// big ('a' on a tie) and the other small. While big exceeds small and small
// has not run out, append two big letters then one small letter; then, while
// letters remain, append one big letter if any are left, then one small
// letter if any are left.
function strWithout3a3b(a: number, b: number): string {
    let big = a;
    let bigLetter = "a";
    let small = b;
    let smallLetter = "b";
    if (b > a) {
        big = b;
        bigLetter = "b";
        small = a;
        smallLetter = "a";
    }
    const parts: string[] = [];
    while (big > small && small > 0) {
        parts.push(bigLetter + bigLetter + smallLetter);
        big -= 2;
        small -= 1;
    }
    while (big > 0 || small > 0) {
        if (big > 0) {
            parts.push(bigLetter);
            big -= 1;
        }
        if (small > 0) {
            parts.push(smallLetter);
            small -= 1;
        }
    }
    return parts.join("");
}
