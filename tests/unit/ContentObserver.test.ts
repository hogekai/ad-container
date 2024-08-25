import { describe, it, expect, vi } from "vitest";
import { ContentObserver } from "@/ContentObserver";

describe("ContentObserver", () => {
  it("should observe changes and call callback", async () => {
    const target = document.createElement("div");
    const callback = vi.fn();
    const observer = new ContentObserver(target, callback);

    observer.start();
    target.innerHTML = "<span>New content</span>";

    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for MutationObserver
    expect(callback).toHaveBeenCalled();
  });

  it("should stop observing when stopped", async () => {
    const target = document.createElement("div");
    const callback = vi.fn();
    const observer = new ContentObserver(target, callback);

    observer.start();
    observer.stop();
    target.innerHTML = "<span>New content</span>";

    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for MutationObserver
    expect(callback).not.toHaveBeenCalled();
  });
});
