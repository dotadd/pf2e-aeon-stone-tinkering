export function wrapInParagraph(text: string): string {
    const paragraphRegex = new RegExp("^<p>.*</p>$");
    if (paragraphRegex.test(text)) {
        return text;
    } else {
        return `<p>${text}</p>`;
    }
}