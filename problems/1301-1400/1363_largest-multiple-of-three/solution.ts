function largestMultipleOfThree(digits: number[]): string {
    const counts = new Array<number>(10).fill(0);
    let total = 0;
    for (const d of digits) {
        counts[d] += 1;
        total += d;
    }

    const remainder = total % 3;
    const drop = (dropCount: number, cls: number): boolean => {
        for (let d = cls; d <= 9; d += 3) {
            const take = Math.min(counts[d], dropCount);
            counts[d] -= take;
            dropCount -= take;
            if (dropCount === 0) return true;
        }
        return false;
    };

    if (remainder === 1) {
        if (!drop(1, 1)) drop(2, 2);
    } else if (remainder === 2) {
        if (!drop(1, 2)) drop(2, 1);
    }

    let text = "";
    for (let d = 9; d >= 0; d--) text += String(d).repeat(counts[d]);
    if (text === "" || text[0] === "0") {
        return counts.some((c) => c !== 0) ? "0" : "";
    }
    return text;
}
