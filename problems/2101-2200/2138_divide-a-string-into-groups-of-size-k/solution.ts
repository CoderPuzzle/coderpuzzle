function divideString(s: string, k: number, fill: string): string[] {
    const padding = (k - (s.length % k)) % k;
    const padded = s + fill.repeat(padding);
    const groups: string[] = [];
    for (let start = 0; start < padded.length; start += k) {
        groups.push(padded.slice(start, start + k));
    }
    return groups;
}
