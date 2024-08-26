import { describe, it, expect, vi, beforeEach, afterEach, beforeAll } from 'vitest';
import { AdContainer } from '@/AdContainer';


vi.mock('../../src/IframeManager', () => {
  return {
    IframeManager: vi.fn().mockImplementation((shadowRoot) => {
      const iframe = document.createElement("iframe");

      return {
        iframe,
        shadowRoot,
        getContentWindow: vi.fn().mockReturnValue({}),
        setup: vi.fn(function() {
          if (shadowRoot) {
            shadowRoot.appendChild(iframe);
          }
        }),
        setContent: vi.fn(),
      };
    })
  };
});

describe('AdContainer', () => {
  let container: AdContainer;

  beforeAll(() => {
    if (!customElements.get("ad-container")) {
      customElements.define("ad-container", AdContainer);
    }
  });

  beforeEach(() => {
    container = new AdContainer();
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should create an iframe when connected', () => {
    const iframe = container.shadowRoot?.querySelector('iframe');
    expect(iframe).toBeTruthy();
  });

  it('should update iframe content when child nodes change', async () => {
    const updateSpy = vi.spyOn(container as any, 'updateIframeContent');
    container.innerHTML = '<div>Test Content</div>';
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(updateSpy).toHaveBeenCalled();
  });

  it('should handle disconnectedCallback', () => {
    const stopSpy = vi.spyOn(container['contentObserver'], 'stop');
    container.disconnectedCallback();
    expect(stopSpy).toHaveBeenCalled();
  });
});