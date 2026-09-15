/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
    const n = version1.length;
    const m = version2.length;
    let i = 0;
    let j = 0;
    while (i < n || j < m) {
        // Read the revision at each pointer as a number, so leading zeros
        // vanish into the value instead of poisoning the comparison.
        let a = 0;
        while (i < n && version1[i] !== ".") a = a * 10 + (version1.charCodeAt(i++) - 48);
        let b = 0;
        while (j < m && version2[j] !== ".") b = b * 10 + (version2.charCodeAt(j++) - 48);
        if (a !== b) return a < b ? -1 : 1;
        // Step past the dot; a spent string simply leaves its pointer at n.
        if (i < n) i++;
        if (j < m) j++;
    }
    return 0;
};
