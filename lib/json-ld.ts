/**
 * Safe JSON-LD for <script type="application/ld+json">: prevents `</script>` in strings
 * from breaking out of the script block (HTML parsing quirk).
 */
export function jsonLdContent(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
