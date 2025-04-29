import React, {forwardRef} from 'react'

const HowItWorks = (props, ref) => {
  return (
    <div ref={ref}>
      <h2>How It Works</h2>
    </div>
  )
}

export default forwardRef(HowItWorks); 