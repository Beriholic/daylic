export function transferText(str: string, mode: "u2a" | "a2u") {
  if (mode === "a2u") {
    return str.replace(/&#(\d+);/g, (_, $1) => String.fromCharCode(Number($1)));
  }
  return str.replace(/./, (_) => `&#${_.charCodeAt(0)};`);
}
export function transferTip() {}

export function extractMicroWeibo(jsonData: string): string[] {
  try {
    const response = JSON.parse(jsonData);
    const microWeibos: string[] = [];

    for (const article of response.data) {
      const match = article.content.match("/【微语】(.*?)</p>/s");
      if (match) {
        microWeibos.push(match[1].trim());
      }
    }

    return microWeibos;
  } catch (error) {
    console.error("解析 JSON 出错:", error);
    return [];
  }
}
