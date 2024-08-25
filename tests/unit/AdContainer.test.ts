import { AdContainer } from "@/AdContainer";
import { describe, expect, it } from "vitest";

describe("AdContainer", () => {
  customElements.define("ad-container", AdContainer);

  it("creates an iframe when connected", async () => {
    const container = document.createElement("ad-container");
    document.body.appendChild(container);

    await new Promise((resolve) => setTimeout(resolve, 0));

    const iframe = container.shadowRoot?.querySelector("iframe");
    expect(iframe).toBeTruthy();
  });

  it("updates iframe content", async () => {
    const container = document.createElement("ad-container");
    container.innerHTML = "<p>Test content</p>";
    document.body.appendChild(container);

    await new Promise((resolve) => setTimeout(resolve, 0));

    const iframe = container.shadowRoot?.querySelector(
      "iframe"
    ) as HTMLIFrameElement;
    expect(iframe.srcdoc).toContain("<p>Test content</p>");
  });
});
