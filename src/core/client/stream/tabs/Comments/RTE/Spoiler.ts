import {
  createAPI,
  createToggle,
  findAncestor,
  findIntersecting,
  getSelectionRange,
  insertNodes,
  selectEndOfNode,
} from "@coralproject/rte";
import bowser from "bowser";
import { KeyboardEvent } from "react";

type API = ReturnType<typeof createAPI>;

const boldTags = ["B", "STRONG"];

// function execCommand(this: API) {
//   const result = document.execCommand("strikeThrough");
//   // const result = document.execCommand(
//   //   "insertHTML",
//   //   false,
//   //   "<strike>" + window.getSelection() + "</strike>"
//   // );

//   if (bowser.msie) {
//     this.broadcastChange();
//   }
//   return result;
// }

function execCommand(this: API) {
  // Expanded selection means we always select whole lines.
  const selectedNodes = getSelectionRange();
  const node = document.createElement("strike");
  insertNodes(node);
  selectEndOfNode(node);
}

function isActive(this: API) {
  return this.focused && document.queryCommandState("strikeThrough");
  // return !!findIntersecting("STRIKE", this.container);
  // return !!findIntersecting((n: Node) => {
  //   console.log(n.nodeName);
  //   if (n.nodeName === "#text") {
  //     return;
  //   }
  //   // console.log(
  //   //   window.getComputedStyle(n).getPropertyValue("background-color")
  //   // );
  // }, this.container);

  // return false;
  // return txt.startsWith("<customtag>") && txt.endsWith("</customtag>");

  // return this.focused && document.queryCommandState("bold");
}
function isDisabled(this: API) {
  return false;
  if (!this.focused) {
    return false;
  }

  // Disable whenever the bold styling came from a different
  // tag than those we control.
  return !!findIntersecting(
    (n: Node) =>
      n.nodeName !== "#text" &&
      window.getComputedStyle(n as Element).getPropertyValue("font-weight") ===
        "bold" &&
      !boldTags.includes((n as Element).tagName) &&
      !findAncestor(
        n,
        (node: Node) => boldTags.includes((node as Element).tagName),
        this.container
      ),
    this.container
  );
}

function onShortcut(this: API, e: KeyboardEvent) {
  if (e.key === "b") {
    if (!isDisabled.apply(this)) {
      execCommand.apply(this);
    }
    return true;
  }
  return false;
}

const Bold = createToggle(execCommand, { isActive, isDisabled, onShortcut });

Bold.defaultProps = {
  children: "Bold",
};

export default Bold;
