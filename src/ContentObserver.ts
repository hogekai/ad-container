export class ContentObserver {
  private observer: MutationObserver;

  constructor(private target: HTMLElement, private callback: () => void) {
    this.observer = new MutationObserver(() => this.callback());
  }

  start() {
    this.observer.observe(this.target, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  stop() {
    this.observer.disconnect();
  }
}
