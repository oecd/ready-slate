/* eslint-disable react/jsx-props-no-spreading, react/jsx-wrap-multilines */
import React, {
  useMemo,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  FloatingPortal,
  useFloating,
  shift,
  offset,
  arrow,
} from '@floating-ui/react';

import useHandleClickOutside from '../hooks/useHandleClickOutside';

const DomRectPopper = ({
  domRect = null,
  onClickOutside = null,
  preventDefault = false,
  onMount = null,
  children = null,
  popperClassName = '',
}) => {
  const arrowRef = useRef(null);

  const {
    x,
    y,
    refs,
    strategy,
    middlewareData: { arrow: { x: arrowX } = {} },
  } = useFloating({
    placement: 'top',
    middleware: [offset(10), shift(), arrow({ element: arrowRef })],
  });

  const [
    hasBeenRenderedAtCorrectPosition,
    setHasBeenRenderedAtCorrectPosition,
  ] = useState(false);

  const onMouseDown = useMemo(
    () =>
      preventDefault
        ? (e) => {
            e.preventDefault();
          }
        : null,
    [preventDefault],
  );

  useLayoutEffect(() => {
    refs.setReference({
      getBoundingClientRect: () => domRect,
    });
  }, [refs, domRect]);

  useEffect(() => {
    if (onMount) {
      onMount();
    }
  }, [onMount]);

  useEffect(() => {
    if (x !== 0 || y !== 0) {
      setTimeout(() => setHasBeenRenderedAtCorrectPosition(true), 50);
    }
  }, [x, y]);

  useHandleClickOutside([refs.floating], () => {
    if (onClickOutside) {
      onClickOutside();
    }
  });

  return (
    <FloatingPortal>
      <div
        ref={refs.setFloating}
        style={{
          position: strategy,
          top: y ?? '',
          left: x ?? '',
          opacity: hasBeenRenderedAtCorrectPosition ? 1 : 0,
          transition: hasBeenRenderedAtCorrectPosition
            ? 'all 150ms ease-out'
            : 'none',
        }}
        className={`rs-popper ${popperClassName}`}
        onMouseDown={onMouseDown}
        role="toolbar"
      >
        {children}
        <div
          ref={arrowRef}
          style={{
            position: strategy,
            left: arrowX ?? '',
          }}
          className="rs-popper-arrow"
        />
      </div>
    </FloatingPortal>
  );
};

DomRectPopper.propTypes = {
  domRect: PropTypes.object,
  onClickOutside: PropTypes.func,
  preventDefault: PropTypes.bool,
  onMount: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  popperClassName: PropTypes.string,
};

export default DomRectPopper;
