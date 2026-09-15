/**
 * @param {string} s
 * @return {string}
 */
var maskPII = function (s) {
    // The '@' sign only appears in emails, so finding it settles
    // which of the two shapes the input is. An email answer keeps
    // the name's first and last letters and everything from the '@'
    // on, folds uppercase to lowercase by adding 32, and pins the
    // name's middle to five asterisks; the name is at least two
    // letters, so even "ab" wears the full five. A phone answer
    // needs only the digits: ten of them form the bare local number,
    // and each digit beyond ten contributes one masked asterisk
    // behind a '+', ahead of the shared "***-***-" tail and the
    // last four digits.
    const at = s.indexOf("@");
    const out = [];
    if (at >= 0) {
        for (let i = 0; i < s.length; i++) {
            // Position 1 opens the fixed five-asterisk middle; the
            // name's first and last letters and the whole domain
            // are the only characters kept.
            if (i === 1) {
                out.push("*****");
            }
            if (i === 0 || i >= at - 1) {
                const code = s.charCodeAt(i);
                out.push(String.fromCharCode(code >= 65 && code <= 90 ? code + 32 : code));
            }
        }
    } else {
        const digits = [];
        for (let i = 0; i < s.length; i++) {
            const code = s.charCodeAt(i);
            if (code >= 48 && code <= 57) {
                digits.push(s.charAt(i));
            }
        }
        // Every digit past ten is one masked country-code star.
        if (digits.length > 10) {
            out.push("+" + "*".repeat(digits.length - 10) + "-");
        }
        out.push("***-***-");
        out.push(digits.slice(-4).join(""));
    }
    return out.join("");
};
