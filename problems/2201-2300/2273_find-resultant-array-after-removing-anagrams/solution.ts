function removeAnagrams(words: string[]): string[] {
    const result: string[] = [];
    let prev = "";
    for (const word of words) {
        const signature = word.split("").sort().join("");
        if (signature !== prev) {
            result.push(word);
            prev = signature;
        }
    }
    return result;
}
