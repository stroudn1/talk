import cn from "classnames";
import React, { FunctionComponent, useEffect, useRef } from "react";

import { createPurify } from "coral-common/utils/purify";

import styles from "./HTMLContent.css";

/**
 * Create a purify instance that will be used to handle HTML content.
 */
const purify = createPurify(window, false);

interface HTMLContentProps {
  children: string;
  className?: string;
}

const HTMLContent: FunctionComponent<HTMLContentProps> = ({
  children,
  className,
}) => {
  const div = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (div && div.current) {
      div.current.addEventListener("click", e => {
        if (e.target && (e.target as Element).matches(".coral-spoiler")) {
          e.target.classList.toggle("coral-spoiler-open");
        }
      });
    }
  }, [children]);
  return (
    <div
      ref={div}
      className={cn(styles.root, className)}
      dangerouslySetInnerHTML={{ __html: purify.sanitize(children) }}
    />
  );
};

export default HTMLContent;
