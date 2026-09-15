function destCity(paths: string[][]): string {
    const sources = new Set(paths.map((path) => path[0]));
    for (const [, destination] of paths) {
        if (!sources.has(destination)) {
            return destination;
        }
    }
    return "";
}
