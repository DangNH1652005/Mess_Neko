import React from 'react'

const ErrorMessage = ({error}) => {
  return (
   <div className="flex flex-col items-center justify-center py-16 text-center">
      
      <h3 className="text-lg font-semibold mb-2">Have a new error</h3>
      <p className="text-base-content opacity-70 max-w-md">
        {error}
      </p>
    </div>
  )
}

export default ErrorMessage