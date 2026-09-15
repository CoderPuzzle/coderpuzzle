function restoreIpAddresses(s: string): string[] {
    const addresses: string[] = [];
    const segments: string[] = [];
    const cut = function (start: number): void {
        const remaining = 4 - segments.length;
        // What is left must feed 1-3 digits to every remaining segment; at
        // zero segments left this accepts only a fully consumed string.
        if (remaining > s.length - start || s.length - start > 3 * remaining) {
            return;
        }
        if (remaining === 0) {
            addresses.push(segments.join("."));
            return;
        }
        // Shorter cuts first: a dot sorts before any digit, so the output
        // lands in ascending lexicographic order.
        for (let length = 1; length <= 3; ++length) {
            if (start + length > s.length) {
                break;
            }
            const part = s.slice(start, start + length);
            // A segment is 0-255 with no leading zero unless it is exactly "0".
            if (part.length > 1 && part[0] === "0") {
                continue;
            }
            if (Number(part) > 255) {
                continue;
            }
            segments.push(part);
            cut(start + length);
            segments.pop();
        }
    };
    cut(0);
    return addresses;
}
