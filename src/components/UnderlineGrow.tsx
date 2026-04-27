import React from "react";

type Props = {
  children: React.ReactNode;
  active?: boolean; // 🔥 opcional para títulos principales
};

export default function UnderlineGrow({ children, active = false }: Props) {
  return (
    <span
      className={`
        relative inline-block
        after:content-[''] after:absolute after:left-0 after:-bottom-2
        after:h-[4px]
        after:bg-[#d8b98c]
        after:rounded-full
        after:transition-all after:duration-300 after:ease-out
        ${active ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
      `}
    >
      {children}
    </span>
  );
}