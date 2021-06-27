import React from 'react';

//If you use export in this mannger, 
//then you must use {} in your import statement
//If you don't wish to use {},
//then you must use export default statement at end

export function BoilingVerdict(props) {
    if (props.celsius >= 100) {
      return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
  }
