function removeVowels(s: string): string {
    let kept = "";
    for (const c of s) {
        if (c !== "a" && c !== "e" && c !== "i" && c !== "o" && c !== "u") kept += c;
    }
    return kept;
}
