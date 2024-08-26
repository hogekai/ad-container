import { describe, it, expect, beforeEach } from "vitest";
import { ScriptHandler } from "@/ScriptHandler";

describe("ScriptHandler", () => {
  let scriptHandler: ScriptHandler;

  beforeEach(() => {
    scriptHandler = new ScriptHandler();
  });

  it("should disable scripts", () => {
    const script = document.createElement("script");
    script.setAttribute("type", "text/javascript");

    scriptHandler.disableScripts([script]);
    expect(script.getAttribute("type")).toBe("text/plain");
    expect(script.getAttribute("data-original-type")).toBe("text/javascript");
  });

  it("should restore scripts", () => {
    const script = document.createElement("script");
    script.setAttribute("type", "text/plain");
    script.setAttribute("data-original-type", "text/javascript");

    scriptHandler.restoreScripts([script]);
    expect(script.getAttribute("type")).toBe("text/javascript");
    expect(script.hasAttribute("data-original-type")).toBe(false);
  });
});
