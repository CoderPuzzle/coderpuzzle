// The first letter to appear twice is exactly the first letter whose second
// occurrence shows up, so one left-to-right scan with a seen set ends the
// moment a repeat is met.
function repeatedCharacter(s: string): string {
    const seen = new Set<string>();
    for (const ch of s) {
        if (seen.has(ch)) {
            return ch;
        }
        seen.add(ch);
    }
    return "";
}
