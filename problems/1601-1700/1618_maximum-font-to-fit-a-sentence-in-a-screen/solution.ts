function maxFont(text: string, w: number, h: number, fonts: number[], widths: number[][], heights: number[]): number {
    // Fit is monotonic in the font index (widths/heights only grow), so
    // binary search the boundary between fitting and not fitting.
    const fits = (index: number): boolean => {
        if (heights[index] > h) {
            return false;
        }
        const row = widths[index];
        let total = 0;
        for (let i = 0; i < text.length; i++) {
            total += row[text.charCodeAt(i) - 97];
            if (total > w) {
                return false;
            }
        }
        return true;
    };

    let lo = 0;
    let hi = fonts.length - 1;
    let answer = -1;
    while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (fits(mid)) {
            answer = fonts[mid];
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return answer;
}
