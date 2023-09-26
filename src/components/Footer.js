import React from 'react'

export default function Footer() {


  return (
    <>
      <footer className="text-center text-white bg-danger p-4">
        <strong>
            &copy; {new Date().getFullYear()} Blake Harrison, All Rights Reserved
        </strong>
      </footer>
    </>
  )
}
