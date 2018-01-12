import React from 'react';
import PropTypes from 'prop-types';
import ContentEditable from 'react-contenteditable';
import isFunction from 'd2-utilizr/lib/isFunction';

import './D2ContentEditable.css';

const KEYCODE_ENTER = 13;

const handleKeyDown = (event, onBlur) => {
    if (event.keyCode === KEYCODE_ENTER) {
        event.preventDefault();
        this.component.htmlEl.blur();

        isFunction(onBlur) && onBlur(this.component.htmlEl.textContent);
    }
};

const D2ContentEditable = props => (
    // Provide both 'disabled' and 'disable' due to typo in shouldComponentUpdate
    <ContentEditable
        ref={c => (this.component = c)}
        className={props.className}
        html={props.name}
        onKeyDown={e => handleKeyDown(e, props.onBlur)}
        disabled={props.disabled}
        disable={'' + props.disabled}
        data-text={props.placeholder}
    />
);

D2ContentEditable.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
};

D2ContentEditable.defaultProps = {
    className: '',
    name: '',
    onBlur: null,
    disabled: false,
    placeholder: '',
};

export default D2ContentEditable;