export interface ScriptContent {
  attributes: { name: string; value: string }[];
  textContent: string | null;
}

export class ScriptHandler {
  extractScriptContents(scripts: HTMLScriptElement[]): ScriptContent[] {
    return scripts.map((script) => ({
      attributes: Array.from(script.attributes).map((attr) => ({
        name: attr.name,
        value: attr.value,
      })),
      textContent: script.textContent,
    }));
  }

  disableScripts(scripts: HTMLScriptElement[]) {
    scripts.forEach((script) => {
      script.type = "text/plain";
      script.setAttribute(
        "data-original-type",
        script.getAttribute("type") || ""
      );
    });
  }

  restoreScripts(scripts: HTMLScriptElement[]) {
    scripts.forEach((script) => {
      const originalType = script.getAttribute("data-original-type");
      if (originalType) {
        script.type = originalType;
      } else {
        script.removeAttribute("type");
      }
      script.removeAttribute("data-original-type");
    });
  }
}
