/* eslint-disable react/jsx-props-no-spreading, react/jsx-wrap-multilines */
import React, {
  useMemo,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useFloating, shift, offset, arrow } from '@floating-ui/react-dom';
import { FloatingPortal } from '@floating-ui/react-dom-interactions';

import useHandleClickOutside from '../hooks/useHandleClickOutside';

const DomRectPopper = ({
  domRect,
  onClickOutside,
  preventDefault,
  onMount,
  children,
  popperClassName,
}) => {
  const arrowRef = useRef(null);

  const {
    x,
    y,
    reference,
    floating,
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
    reference({
      getBoundingClientRect: () => domRect,
    });
  }, [reference, domRect]);

  useEffect(() => {
    if (onMount) {
      onMount();
    }
  }, [onMount]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (refs.floating.current?.style.top) {
      setHasBeenRenderedAtCorrectPosition(true);
    }
  });

  useHandleClickOutside([refs.floating], () => {
    if (onClickOutside) {
      onClickOutside();
    }
  });

  return (
    <FloatingPortal>
      <div
        ref={floating}
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

DomRectPopper.defaultProps = {
  domRect: null,
  onClickOutside: null,
  preventDefault: false,
  onMount: null,
  children: null,
  popperClassName: '',
};

export default DomRectPopper;
