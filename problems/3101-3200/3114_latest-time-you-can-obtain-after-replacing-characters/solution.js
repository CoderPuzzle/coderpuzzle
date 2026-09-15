/**
 * @param {string} s
 * @return {string}
 */
var findLatestTime = function (s) {
    // Enumeration per the hint: try every one of the 12 * 60 legal times in
    // ascending order and keep the last pattern match; that last match is
    // the latest obtainable time.
    const matches = (candidate) => {
        for (let i = 0; i < 5; ++i) {
            if (s[i] !== "?" && s[i] !== candidate[i]) return false;
        }
        return true;
    };
    let best = "";
    for (let hh = 0; hh < 12; ++hh) {
        for (let mm = 0; mm < 60; ++mm) {
            const two = (v) => String(v).padStart(2, "0");
            const candidate = `${two(hh)}:${two(mm)}`;
            if (matches(candidate)) best = candidate;
        }
    }
    return best;
};
