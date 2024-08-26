import "@webcomponents/custom-elements";
import { AdContainer } from "./AdContainer";

if (!customElements.get("ad-container")) {
  customElements.define("ad-container", AdContainer);
}

export default AdContainer;