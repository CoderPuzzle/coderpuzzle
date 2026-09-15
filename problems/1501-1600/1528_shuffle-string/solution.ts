function restoreString(s: string, indices: number[]): string {
    // indices[i] names s[i]'s destination outright, so just write each
    // character straight into its final slot.
    const result = new Array<string>(s.length);
    for (let i = 0; i < s.length; ++i) {
        result[indices[i]] = s[i];
    }
    return result.join("");
}
