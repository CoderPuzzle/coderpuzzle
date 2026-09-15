// Strip the separators, then group by remaining length: while more
// than 4 digits remain, cut a block of 3; the final 4, 3, or 2 digits
// are forced — 4 splits into two blocks of 2, the rest stay whole.
function reformatNumber(number: string): string {
    const digits = number.replace(/[^0-9]/g, "");
    const blocks: string[] = [];
    let i = 0;
    while (digits.length - i > 4) {
        blocks.push(digits.slice(i, i + 3));
        i += 3;
    }
    const tail = digits.slice(i);
    if (tail.length === 4) {
        blocks.push(tail.slice(0, 2), tail.slice(2));
    } else {
        blocks.push(tail);
    }
    return blocks.join("-");
}
