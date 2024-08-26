import { describe, it, expect, vi, beforeEach } from "vitest";
import { IframeManager } from "@/IframeManager";

describe("IframeManager", () => {
  let shadowRoot: ShadowRoot;
  let iframeManager: IframeManager;

  beforeEach(() => {
    shadowRoot = document.createElement("div").attachShadow({ mode: "open" });
    iframeManager = new IframeManager(shadowRoot);
  });

  it("should setup iframe and style", () => {
    iframeManager.setup();
    const iframe = shadowRoot.querySelector("iframe");
    const style = shadowRoot.querySelector("style");
    expect(iframe).toBeTruthy();
    expect(style).toBeTruthy();
  });

  it("should set content and handle scripts", () => {
    iframeManager.setup();
    const content = '<div>Test</div><script>console.log("test");</script>';
    const scriptContents = [
      {
        attributes: [{ name: "type", value: "text/javascript" }],
        textContent: 'console.log("test");',
      },
    ];

    iframeManager.setContent(content, scriptContents);

    const iframe = shadowRoot.querySelector("iframe") as HTMLIFrameElement;
    expect(iframe.srcdoc).toContain("<div>Test</div>");

    expect(iframe.onload).toBeTruthy();
    expect(iframe.srcdoc).toContain("<script>console.log(\"test\");</script>");
  });
});
