'use client';

/* eslint-disable react/prop-types */
function Row({ type = 'hor', children }) {
  if (type === 'hor')
    return <div className="flex items-center justify-between gap-4">{children}</div>;
  return <div className="flex flex-col gap-4">{children}</div>;
}

export default Row;
