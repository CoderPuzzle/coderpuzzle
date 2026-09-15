/**
 * @param {string} queryIP
 * @return {string}
 */
var validIPAddress = function (queryIP) {
    // Four dotted decimal parts, or eight colon-separated hex groups: the
    // separator count is the first gate, and it settles queries that mix
    // both separators on sight — a valid address of either kind can never
    // contain the other kind's separator.
    const dotted = queryIP.split(".");
    if (dotted.length === 4 && dotted.every(isIpv4Part)) return "IPv4";
    const groups = queryIP.split(":");
    if (groups.length === 8 && groups.every(isIpv6Part)) return "IPv6";
    return "Neither";
};

// 1-3 pure digits, no leading zero ("0" alone is the one way to write
// zero), and a value of at most 255.
function isIpv4Part(part) {
    if (part.length < 1 || part.length > 3) return false;
    let value = 0;
    for (let i = 0; i < part.length; i++) {
        const ch = part[i];
        if (ch < "0" || ch > "9") return false;
        value = value * 10 + (ch.charCodeAt(0) - 48);
    }
    return value <= 255 && !(part.length > 1 && part[0] === "0");
}

// 1-4 characters of hex, either case; leading zeros are allowed.
function isIpv6Part(part) {
    if (part.length < 1 || part.length > 4) return false;
    for (let i = 0; i < part.length; i++) {
        const ch = part[i];
        const isHex = (ch >= "0" && ch <= "9") || (ch >= "a" && ch <= "f") || (ch >= "A" && ch <= "F");
        if (!isHex) return false;
    }
    return true;
}
