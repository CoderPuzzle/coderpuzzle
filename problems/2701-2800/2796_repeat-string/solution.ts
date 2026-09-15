interface String {
    replicate(x: number): string;
}

class Solution {
    solve(strCase: StrCase): string {
        // Enhance every string with replicate: binary squaring. A running
        // power carries the string doubled up to each power-of-two block
        // and every set bit of x appends its block, so x = 10^5 costs
        // about thirty-two concatenation operations instead of one
        // hundred thousand — without ever touching the built-in repeat.
        // The descriptors mirror a native method: replaceable but absent
        // from enumerations, so ordinary string users see nothing.
        Object.defineProperty(String.prototype, "replicate", {
            value: function (this: string, x: number): string {
                let result = "";
                let power = String(this);
                for (; x > 0; x >>= 1) {
                    if ((x & 1) === 1) result += power;
                    if (x > 1) power += power;
                }
                return result;
            },
            writable: true,
            enumerable: false,
            configurable: true,
        });
        return String.prototype.replicate.call(strCase.str, strCase.times);
    }
}
