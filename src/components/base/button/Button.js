import React from 'react';
import classes from './Button.module.scss'

export default class Button extends React.Component {

    render() {
        return (
            <button
                disabled={this.props.disabled}
                onClick={this.props.onClick}
                className={classes.Button}
            >
                {this.props.text}
            </button>
        )
    }
}