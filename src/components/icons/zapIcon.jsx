import React from 'react'

const ZapIcon = ({ color, glowColor }) => {
  return (
    <svg
      style={{
        filter: glowColor,
      }}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26ZM16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
        fill={color}
      />
      <path d="M11.9997 12H19.9997L17.333 16H9.33301L11.9997 12Z" fill={color} />
      <path d="M14.6667 16H22.6667L20 20H12L14.6667 16Z" fill={color} />
    </svg>
  )
}

export default ZapIcon
