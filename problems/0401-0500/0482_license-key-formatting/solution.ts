// Dashes are separators, not content: build the cleaned key by dropping them
// and uppercasing everything that remains.
function licenseKeyFormatting(s: string, k: number): string {
    const key = s.replace(/-/g, "").toUpperCase();
    if (key === "") {
        return "";
    }
    // Only the first group may be short, and only when the key length leaves
    // a remainder — otherwise it holds the full k characters.
    const head = key.length % k || k;
    const groups: string[] = [key.slice(0, head)];
    for (let i = head; i < key.length; i += k) {
        groups.push(key.slice(i, i + k));
    }
    return groups.join("-");
}
