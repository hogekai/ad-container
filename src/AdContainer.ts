export class AdContainer extends HTMLElement {
  private iframe: HTMLIFrameElement;
  private resizeObserver: ResizeObserver;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.iframe = document.createElement("iframe");
    this.iframe.style.border = "none";
    this.iframe.style.width = "100%";
    this.iframe.style.height = "100%";
  }

  public connectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(this.iframe);
      this.updateIframeContent();
    }
  }

  public disconnectedCallback() {
  }

  private updateIframeContent() {
    const content = this.innerHTML;
    this.innerHTML = "";
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
    this.iframe.srcdoc = html;
  }
}
