"use client";

import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { parse } from "ansicolor";
import { throttle } from "lodash";

const getColorClassByName = (name, bright) => {
  switch (name) {
    case "darkGray": {
      return "black-light";
    }
    case "lightGray": {
      return bright ? "gray-light" : "gray";
    }
    case "white": {
      return "gray-light";
    }

    case "black":
    case "red":
    case "green":
    case "yellow":
    case "blue":
    case "magenta":
    case "cyan": {
      return bright ? `${name}-light` : name;
    }
    case "lightRed":
    case "lightGreen":
    case "lightYellow":
    case "lightBlue":
    case "lightMagenta":
    case "lightCyan": {
      return `${name.slice(5).toLowerCase()}-light`;
    }

    default: {
      return "";
    }
  }
};

const getSpanClasses = (span) => {
  const classesArray = [];

  if (span.italic) {
    classesArray.push("italic");
  }

  if (span.bold) {
    classesArray.push("font-bold");
  }

  if (span.underline) {
    classesArray.push("underline");
  }

  if (span.color?.dim) {
    classesArray.push("text-opacity-50");
  }

  if (span.bgColor?.dim) {
    classesArray.push("bg-opacity-50");
  }

  if (span.color?.name) {
    classesArray.push(
      `text-campbell-${getColorClassByName(
        span.color.name,
        span.color?.bright,
      )}`,
    );
  }

  if (span.bgColor?.name) {
    classesArray.push(
      `bg-campbell-${getColorClassByName(
        span.bgColor.name,
        span.bgColor?.bright,
      )}`,
    );
  }

  return classesArray.join(" ");
};

const Terminal = ({ lines }) => {
  const containerRef = useHotkeys(
    "ctrl+a",
    () => {
      window.getSelection().selectAllChildren(containerRef.current);
    },
    { preventDefault: true },
  );

  useEffect(() => {
    const scrollToBottom = throttle(() => {
      containerRef.current?.scrollTo({
        top: containerRef.current?.scrollHeight,
        behavior: "instant",
      });
    }, 150);

    scrollToBottom();
  }, [lines, containerRef]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onContextMenu={(e) => {
        if (
          containerRef.current.contains(window.getSelection().anchorNode) &&
          containerRef.current.contains(window.getSelection().focusNode) &&
          !window.getSelection().isCollapsed
        ) {
          e.preventDefault();
          navigator.clipboard.writeText(window.getSelection().toString());
          window.getSelection().removeAllRanges();
        }
      }}
      className="group h-full w-full overflow-auto bg-campbell-black px-4 py-2 font-mono text-sm text-campbell-gray-light selection:bg-campbell-selection"
    >
      {lines &&
        lines.map((line, index) => {
          const parsedLine = parse(line);
          return (
            <div key={index} className="whitespace-nowrap">
              {parsedLine.spans &&
                parsedLine.spans.map((span, spanIndex) => {
                  return (
                    <pre
                      key={spanIndex}
                      className={`inline ${getSpanClasses(span)}`}
                    >
                      {span.text}
                    </pre>
                  );
                })}
            </div>
          );
        })}
      <div className="h-5 w-2 border border-white bg-transparent group-focus:animate-blink group-focus:bg-white"></div>
    </div>
  );
};

export default Terminal;
