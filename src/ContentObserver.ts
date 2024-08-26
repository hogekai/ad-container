export class ContentObserver {
  private observer: MutationObserver;

  constructor(private target: HTMLElement, private callback: () => void) {
    this.observer = new MutationObserver(() => this.callback());
  }

  public start() {
    this.observer.observe(this.target, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  public stop() {
    this.observer.disconnect();
  }
}
