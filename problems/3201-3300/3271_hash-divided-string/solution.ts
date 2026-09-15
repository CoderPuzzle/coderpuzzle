function stringHash(s: string, k: number): string {
    // The chunks are the fixed windows of k characters because n is a
    // multiple of k: each pass reads one window, adds up its characters'
    // alphabet indices, and appends the letter at index sum % 26. The
    // running total never exceeds 25 * 100 = 2500, so ordinary integers
    // suffice, and one linear pass visits every character exactly once.
    const n = s.length;
    let result = "";
    for (let base = 0; base < n; base += k) {
        let total = 0;
        for (let j = base; j < base + k; ++j) {
            total += s.charCodeAt(j) - 97;
        }
        result += String.fromCharCode(97 + (total % 26));
    }
    return result;
}
