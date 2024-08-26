import { ContentObserver } from "./ContentObserver";
import { IframeManager } from "./IframeManager";
import { ScriptHandler } from "./ScriptHandler";

export class AdContainer extends HTMLElement {
  private iframeManager: IframeManager;
  private contentObserver: ContentObserver;
  private scriptHandler: ScriptHandler;
  public isConnected: boolean = false;
  private pendingUpdate: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.iframeManager = new IframeManager(this.shadowRoot!);
    this.scriptHandler = new ScriptHandler();
    this.contentObserver = new ContentObserver(this, () =>
      this.handleContentChange()
    );
  }

  connectedCallback() {
    this.isConnected = true;
    this.iframeManager.setup();
    this.contentObserver.start();
    this.updateIfPending();
  }

  disconnectedCallback() {
    this.isConnected = false;
    this.contentObserver.stop();
  }

  private handleContentChange() {
    if (this.isConnected) {
      this.updateIframeContent();
    } else {
      this.pendingUpdate = true;
    }
  }

  private updateIfPending() {
    if (this.pendingUpdate) {
      this.updateIframeContent();
      this.pendingUpdate = false;
    }
  }

  private updateIframeContent() {
    const scripts = Array.from(this.querySelectorAll("script"));
    const scriptContents = this.scriptHandler.extractScriptContents(scripts);
    this.scriptHandler.disableScripts(scripts);
    const content = this.innerHTML;
    this.iframeManager.setContent(content, scriptContents);
  }
}
