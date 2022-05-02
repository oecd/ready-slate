/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import * as R from 'ramda';

const useHandleClickOutside = (refs, onClickOutside) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const containsTarget = (ref) =>
        ref?.current && ref.current.contains(event.target);

      if (refs && R.none(containsTarget, refs)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [...refs]);
};

export default useHandleClickOutside;
