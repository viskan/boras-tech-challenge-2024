import type {ReactNode} from "react";
import {cx} from "class-variance-authority";

interface Props {
  children?: ReactNode;
  className?: string;
  tag?: "div" | "main" | "section" | "header" | "footer";
}

const MaxWidthWrapper = ({className, children, tag = "div"}: Props) => {
  const Tag = tag;

  return (
    <Tag className={cx("mx-auto w-full max-w-screen-xl", className)}>
      {children}
    </Tag>
  );
};

export default MaxWidthWrapper;