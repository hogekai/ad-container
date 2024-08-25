import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AdContainer } from '@/AdContainer';

describe('AdContainer', () => {
  let container: AdContainer;

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
    await new Promise(resolve => setTimeout(resolve, 0)); // Wait for MutationObserver
    expect(updateSpy).toHaveBeenCalled();
  });

  it('should handle disconnectedCallback', () => {
    const stopSpy = vi.spyOn(container['contentObserver'], 'stop');
    document.body.removeChild(container);
    expect(stopSpy).toHaveBeenCalled();
  });
});