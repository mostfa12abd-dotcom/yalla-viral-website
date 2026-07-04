import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

function useMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    setMobile(window.innerWidth < 768);
  }, []);
  return mobile;
}

export function MotionDiv(props: HTMLMotionProps<"div">) {
  const { children } = props;
  const mobile = useMobile();
  if (mobile) {
    const safeProps: Record<string, unknown> = {};
    if (props.className) safeProps.className = props.className;
    if (props.style) safeProps.style = props.style;
    if (props.id) safeProps.id = props.id;
    if (props.tabIndex !== undefined) safeProps.tabIndex = props.tabIndex;
    if (props.role) safeProps.role = props.role;
    for (const key of Object.keys(props)) {
      if (key.startsWith("on") || key.startsWith("data-")) {
        safeProps[key] = (props as Record<string, unknown>)[key];
      }
    }
    return <div {...safeProps}>{children as ReactNode}</div>;
  }
  return <motion.div {...props as any}>{children as ReactNode}</motion.div>;
}

export function AnimatedPresence({ children }: { children?: ReactNode }) {
  const mobile = useMobile();
  if (mobile) return <>{children}</>;
  return <AnimatePresence>{children}</AnimatePresence>;
}
