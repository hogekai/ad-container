import { ScriptContent } from "./ScriptHandler";

export class IframeManager {
  private iframe: HTMLIFrameElement;

  constructor(private shadowRoot: ShadowRoot) {
    this.iframe = document.createElement("iframe");
  }

  public setup() {
    const style = document.createElement("style");
    style.textContent = `
        :host { display: block; width: 100%; height: 100%; }
        iframe { border: none; width: 100%; height: 100%; }
      `;
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(this.iframe);
  }

  public setContent(content: string, scriptContents: ScriptContent[]) {
    const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/destyle.css@1.0.15/destyle.css"/>
            <style>
              html, body { 
                width: 100%; 
                height: 100%; 
                margin: 0; 
                padding: 0; 
                overflow: hidden;
              }
            </style>
          </head>
          <body>${content}</body>
        </html>
      `;

      console.log('content:', content);

    this.iframe.srcdoc = html.replace(/\n/g, "").replace(/\s+/g, " ").trim();
    this.iframe.onload = () => this.reinsertScripts(scriptContents);
  }

  private reinsertScripts(scriptContents: ScriptContent[]) {
    const iframeDoc = this.iframe.contentDocument;
    if (iframeDoc) {
      const iframeScripts = iframeDoc.querySelectorAll(
        'script[type="text/plain"]'
      );
      iframeScripts.forEach((script, index) => {
        const newScript = iframeDoc.createElement("script");
        const savedScript = scriptContents[index];
        if (savedScript) {
          this.applyScriptAttributes(newScript, savedScript.attributes);
          newScript.textContent = savedScript.textContent;
        } else {
          this.applyScriptAttributes(newScript, Array.from(script.attributes));
          newScript.textContent = script.textContent;
        }
        script.parentNode?.replaceChild(newScript, script);
      });
    }
  }

  private applyScriptAttributes(
    script: HTMLScriptElement,
    attributes: { name: string; value: string }[]
  ) {
    attributes.forEach((attr) => {
      if (attr.name !== "type" || attr.value !== "text/plain") {
        script.setAttribute(attr.name, attr.value);
      }
    });
  }
}
