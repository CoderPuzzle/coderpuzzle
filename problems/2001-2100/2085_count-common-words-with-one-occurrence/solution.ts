function countWords(words1: string[], words2: string[]): number {
    const count = (words: string[]): Map<string, number> => {
        const frequencies = new Map<string, number>();
        for (const word of words) frequencies.set(word, (frequencies.get(word) ?? 0) + 1);
        return frequencies;
    };
    const first = count(words1);
    const second = count(words2);
    let answer = 0;
    for (const [word, frequency] of first) {
        if (frequency === 1 && second.get(word) === 1) answer++;
    }
    return answer;
}
