import React from 'react'

const WalletIcon = ({ color }) => {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24.5 0.5H1.5C0.946875 0.5 0.5 0.946875 0.5 1.5V24.5C0.5 25.0531 0.946875 25.5 1.5 25.5H24.5C25.0531 25.5 25.5 25.0531 25.5 24.5V1.5C25.5 0.946875 25.0531 0.5 24.5 0.5ZM23.25 15H13.5V11H23.25V15ZM23.25 9H12.5C11.9469 9 11.5 9.44687 11.5 10V16C11.5 16.5531 11.9469 17 12.5 17H23.25V23.25H2.75V2.75H23.25V9Z"
        fill={color}
      />
    </svg>
  )
}

export default WalletIcon
