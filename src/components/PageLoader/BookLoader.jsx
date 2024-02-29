import React from 'react';

function BookLoader() {
  const pages = [];
  for (let i = 0; i < 18; i++) {
    pages.push(
      <li key={i} className={`absolute top-0 right-0 h-4 w-48 rounded-lg bg-white transform origin-right transition-all duration-6.8s ease-in-out animate-page-${i}`}></li>
    );
  }

  return (
    <div className="book">
      <div className="inner">
        <div className="left"></div>
        <div className="middle"></div>
        <div className="right"></div>
        <ul className="absolute left-1/2 top-0 transform -translate-x-1/2">
          {pages}
        </ul>
      </div>
      <a className="dribbble fixed right-4 bottom-4" href="https://dribbble.com/shots/7199149-Book-Loader" target="_blank">
        <img src="https://dribbble.com/assets/logo-small-2x-9fe74d2ad7b25fba0f50168523c15fda4c35534f9ea0b1011179275383035439.png" className="block w-19" alt="Dribbble" />
      </a>
    </div>
  );
}

export default BookLoader;
