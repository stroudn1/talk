import {
  createAPI,
  createToggle,
  findAncestor,
  findIntersecting,
} from "@coralproject/rte";
import bowser from "bowser";

type API = ReturnType<typeof createAPI>;

// const boldTags = ["B", "STRONG"];

const commands = { state: {}, exec: {}, value: {} };

function addCommand(command, callback, scope) {
  command = command.toLowerCase();
  commands.exec[command] = function(args) {
    return callback.apply(scope, args);
  };
}

function execCustomCommand() {
  const args = [];
  Array.prototype.push.apply(args, arguments);
  const customCommand = args.shift().toLowerCase();
  let func;
  if ((func = commands.exec[customCommand])) {
    func(args);
    return true;
  }
}

addCommand(
  "insertspoiler",
  function(src, caption) {
    const range = window.getSelection().getRangeAt(0);
    const spoiler = document.createElement("coral-spoiler");
    range.surroundContents(spoiler);
    // figure.innerHTML =
    //   '<img src= "' + src + '" /><figcaption>' + caption + "</figcaption>";
    // IE <= 10
    // if (document.selection) {
    //   var range = document.selection.createRange();
    //   range.pasteHTML(
    //     '<figure> <img src= "' +
    //       src +
    //       '" /  <figcaption>' +
    //       caption +
    //       "</figcaption> </figure>"
    //   );

    //   // IE 11 && Firefox, Opera .....
    // } else if (document.getSelection) {
    //   var range = window.getSelection().getRangeAt(0);
    //   var figure = document.createElement("figure");
    //   range.surroundContents(figure);
    //   figure.innerHTML =
    //     '<img src= "' + src + '" /><figcaption>' + caption + "</figcaption>";
    // }
  },
  null
);

function execCommand(this: API) {
  const result = execCustomCommand("insertspoiler");
  if (bowser.msie) {
    this.broadcastChange();
  }
  return result;
}

function isActive(this: API) {
  // return this.focused && document.queryCommandState("bold");
  return false;
}
function isDisabled(this: API) {
  return false;
  // if (!this.focused) {
  //   return false;
  // }

  // Disable whenever the bold styling came from a different
  // tag than those we control.
  // return !!findIntersecting(
  //   (n: Node) =>
  //     n.nodeName !== "#text" &&
  //     window.getComputedStyle(n as Element).getPropertyValue("font-weight") ===
  //       "bold" &&
  //     !boldTags.includes((n as Element).tagName) &&
  //     !findAncestor(
  //       n,
  //       (node: Node) => boldTags.includes((node as Element).tagName),
  //       this.container
  //     ),
  //   this.container
  // );
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

const Spoiler = createToggle(execCommand, { isActive, isDisabled, onShortcut });

Spoiler.defaultProps = {
  children: "Spoiler",
};

export default Spoiler;
