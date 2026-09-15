function ambiguousCoordinates(s: string): string[] {
    const t = s.slice(1, -1);
    const result: string[] = [];
    // Every valid rendering of a digit run, in the statement's pinned order:
    // decimal forms first, point moving right, then the plain integer last.
    const forms = function (part: string): string[] {
        const out: string[] = [];
        for (let k = 1; k < part.length; ++k) {
            const whole = part.slice(0, k);
            const frac = part.slice(k);
            // The whole part may not open with "0" unless it is exactly "0",
            // and the fractional part may not end in "0".
            if (whole.length > 1 && whole[0] === "0") {
                continue;
            }
            if (frac[frac.length - 1] === "0") {
                continue;
            }
            out.push(whole + "." + frac);
        }
        if (part.length === 1 || part[0] !== "0") {
            out.push(part);
        }
        return out;
    };
    for (let i = 1; i < t.length; ++i) {
        const lefts = forms(t.slice(0, i));
        if (lefts.length === 0) {
            continue;
        }
        const rights = forms(t.slice(i));
        if (rights.length === 0) {
            continue;
        }
        for (const a of lefts) {
            for (const b of rights) {
                result.push("(" + a + ", " + b + ")");
            }
        }
    }
    return result;
}
