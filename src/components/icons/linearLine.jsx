import React from 'react'

const LinearLine = ({ color, middle, id }) => {
  return (
    <svg width='381' height='3' viewBox='0 0 381 3' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M380 1.18066L1 1.18071' stroke={'url(#paint0_linear' + id + ')'} strokeWidth='2' strokeLinecap='round' />
      <defs>
        <linearGradient
          id={'paint0_linear' + id}
          x1='1'
          y1='1.18071'
          x2='380'
          y2='1.18068'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor={color} stopOpacity='0' />
          <stop offset='0.515625' stopColor={middle} />
          <stop offset='1' stopColor={color} stopOpacity='0' />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default LinearLine
