// present[0..25] = lowercase seen, present[26..51] = uppercase seen; a letter
// qualifies when both its lowercase and uppercase forms were seen. Scanning
// the alphabet from Z down to A returns the greatest qualifier.
function greatestLetter(s: string): string {
    const present: boolean[] = new Array(52).fill(false);
    for (const c of s) {
        const code = c.charCodeAt(0);
        if (code >= 97) {
            present[code - 97] = true;
        } else {
            present[26 + code - 65] = true;
        }
    }
    for (let i = 25; i >= 0; i--) {
        if (present[i] && present[26 + i]) {
            return String.fromCharCode(65 + i);
        }
    }
    return "";
}
