function addSpaces(s: string, spaces: number[]): string {
    const parts: string[] = [];
    let spaceIndex = 0;
    for (let index = 0; index < s.length; index++) {
        if (spaceIndex < spaces.length && spaces[spaceIndex] === index) {
            parts.push(" ");
            spaceIndex++;
        }
        parts.push(s[index]);
    }
    return parts.join("");
}
