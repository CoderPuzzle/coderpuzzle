function internalAngles(sides: number[]): number[] {
    const ordered = [...sides].sort((a, b) => a - b);
    if (ordered[0] + ordered[1] <= ordered[2]) return [];

    const result: number[] = [];
    for (let i = 0; i < 3; i += 1) {
        const opposite = ordered[i];
        const adjacent1 = ordered[(i + 1) % 3];
        const adjacent2 = ordered[(i + 2) % 3];
        const cosine =
            (adjacent1 * adjacent1 + adjacent2 * adjacent2 - opposite * opposite) / (2 * adjacent1 * adjacent2);
        const angle = (Math.acos(Math.max(-1, Math.min(1, cosine))) * 180) / Math.PI;
        result.push(Math.round(angle * 100000) / 100000);
    }
    return result;
}
