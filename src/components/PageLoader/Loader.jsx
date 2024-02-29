import React from 'react';

function Loader() {
  return (
    <div className="flex justify-center" style={{ marginTop: '100px' }}>
      <div className="loader rspin w-16 h-16">
        <span className="c"></span>
        <span className="d spin">
          <span className="e"></span>
        </span>
        <span className="r r1"></span>
        <span className="r r2"></span>
        <span className="r r3"></span>
        <span className="r r4"></span>
      </div>
    </div>
  );
}

export default Loader;
