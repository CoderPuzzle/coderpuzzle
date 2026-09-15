function splitWordsBySeparator(words: string[], separator: string): string[] {
    // Split each word at every occurrence of separator and keep the non-empty
    // pieces: leading/trailing separators give empty edge pieces and adjacent
    // ones empty middle pieces; the statement excludes empties, so appending
    // the survivors in walk order yields exactly the required strings.
    const result: string[] = [];
    for (const word of words) {
        for (const piece of word.split(separator)) {
            if (piece !== "") {
                result.push(piece);
            }
        }
    }
    return result;
}
