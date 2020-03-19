import {
  createAPI,
  createToggle,
  findAncestor,
  findIntersecting,
  getSelectionRange,
  insertNodes,
  selectEndOfNode,
  replaceSelection,
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
  let sel = window.getSelection();
  if (sel.isCollapsed) {
    const span = findIntersecting((n: Node) => {
      return (
        n.nodeName !== "#text" &&
        (n as Element).tagName === "SPAN" &&
        (n as Element).classList.contains("coral-spoiler")
      );
    }, this.container);
    if (!span) {
      const node = document.createElement("span");
      node.classList.add("coral-spoiler");
      node.classList.add("coral-spoiler-rte");
      node.innerHTML = "&#8203";
      insertNodes(node);
      let range = document.createRange();
      range.setStart(node, 0);
      range.setEnd(node, 1);
      let sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else {
      let range = document.createRange();
      var textNode = document.createTextNode("\u200B");
      range.setStartAfter(span);
      range.insertNode(textNode);
      range.setStartAfter(textNode);
      range.collapse(true);

      let sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  } else {
    const span = findIntersecting((n: Node) => {
      return (
        n.nodeName !== "#text" &&
        (n as Element).tagName === "SPAN" &&
        (n as Element).classList.contains("coral-spoiler")
      );
    }, this.container);
    if (!span) {
      let sel = window.getSelection();
      const node = document.createElement("span");
      node.classList.add("coral-spoiler");
      const range = sel.getRangeAt(0);
      range.surroundContents(node);
      var textNode = document.createTextNode("\u200B");
      range.setStartAfter(node);
      range.insertNode(textNode);
      range.setStartAfter(textNode);
      range.collapse(true);

      sel.removeAllRanges();
      sel.addRange(range);
    } else {
      const textNode = document.createTextNode(span.textContent);
      span.parentNode.insertBefore(textNode, span);
      span.parentNode.removeChild(span);
    }
  }
}

function isActive(this: API) {
  // return this.focused && document.queryCommandState("strikeThrough");
  // return !!findIntersecting("STRIKE", this.container);
  return !!findIntersecting((n: Node) => {
    return (
      n.nodeName !== "#text" &&
      (n as Element).tagName === "SPAN" &&
      (n as Element).classList.contains("coral-spoiler")
    );
  }, this.container);

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
