import React from 'react'

const YgovIcon = ({ color }) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.12117 9.48525L11.6567 13.0208L18.0207 6.65683L14.4851 3.12129L8.12117 9.48525ZM6.70696 8.77815C6.31643 9.16867 6.31643 9.80184 6.70696 10.1924L10.9496 14.435C11.3401 14.8255 11.9733 14.8255 12.3638 14.435L19.4349 7.36393C19.8254 6.97341 19.8254 6.34024 19.4349 5.94972L15.1922 1.70708C14.8017 1.31655 14.1685 1.31655 13.778 1.70708L6.70696 8.77815Z'
        fill={color}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M19.5 18.5H4.5V20.5H19.5V18.5ZM3 17V21C3 21.5523 3.44772 22 4 22H20C20.5523 22 21 21.5523 21 21V17H3Z'
        fill={color}
      />
      <path d='M3 16.9498L7 13L8.01211 14.059L4.06066 18.0104L3 16.9498Z' fill={color} />
      <path d='M19.9514 18.0121L16 14.0606L17 13L21.0121 16.9514L19.9514 18.0121Z' fill={color} />
      <path d='M17 14.5L15 14.5L17 13V14.5Z' fill={color} />
      <path d='M9 14.5L7 14.5V13L9 14.5Z' fill={color} />
    </svg>
  )
}

export default YgovIcon
