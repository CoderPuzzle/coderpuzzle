function kthDistinct(arr: string[], k: number): string {
    const frequencies = new Map<string, number>();
    for (const word of arr) {
        frequencies.set(word, (frequencies.get(word) ?? 0) + 1);
    }
    for (const word of arr) {
        if (frequencies.get(word) === 1) {
            --k;
            if (k === 0) {
                return word;
            }
        }
    }
    return "";
}
