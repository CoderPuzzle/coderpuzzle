// Enumeration per the hint: try every one of the 12 * 60 legal times in
// ascending order and keep the last pattern match; that last match is the
// latest obtainable time.
function findLatestTime(s: string): string {
    const matches = (candidate: string): boolean => {
        for (let i = 0; i < 5; ++i) {
            if (s[i] !== "?" && s[i] !== candidate[i]) return false;
        }
        return true;
    };
    const two = (v: number): string => String(v).padStart(2, "0");
    let best = "";
    for (let hh = 0; hh < 12; ++hh) {
        for (let mm = 0; mm < 60; ++mm) {
            const candidate = `${two(hh)}:${two(mm)}`;
            if (matches(candidate)) best = candidate;
        }
    }
    return best;
}
