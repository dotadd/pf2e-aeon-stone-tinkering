export function wrapInParagraph(text) {
    const paragraphRegex = new RegExp("^<p>.*</p>$");
    if (paragraphRegex.test(text)) {
        return text;
    }
    else {
        return `<p>${text}</p>`;
    }
}
//# sourceMappingURL=util.js.map