import React from 'react'

const ApyMiddleLinear = ({ color, id }) => {
  return (
    <svg width='842' height='1' viewBox='0 0 842 1' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <line x1='0.5' y1='0.5' x2='841.5' y2='0.5' stroke={'url(#paint43_linear' + id + ')'} strokeLinecap='round' />
      <defs>
        <linearGradient id={'paint43_linear' + id} x1='842' y1='1' x2='0' y2='1' gradientUnits='userSpaceOnUse'>
          <stop stopColor={color} stopOpacity='0' />
          <stop offset='0.515625' stopColor={color} />
          <stop offset='1' stopColor={color} stopOpacity='0' />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default ApyMiddleLinear
