import React from 'react';
import classes from './Input.module.scss'

export default class Input extends React.Component {

    isInvalid({valid, touched}) {
        return !valid && touched
    }

    render() {
        const inputClasses = [classes.InputItem];
        const htmlFor = `${this.props.type}-${Math.random()}`

        if (this.isInvalid(this.props)) {
            inputClasses.push(classes.InputItemError);
        }

        return (
            <div id={this.props.id} className={classes.Input}>
                <label htmlFor={htmlFor} className={classes.InputText}>{this.props.label}</label>
                <input
                    disabled={this.props.disabled}
                    id={htmlFor}
                    type={this.props.type}
                    className={inputClasses.join(' ')}
                    onChange={this.props.onChange}
                />

                {
                    this.isInvalid(this.props)
                        ? <span className={classes.InputNotice}>{this.props.errorMessage}</span>
                        : null
                }
            </div>
        )
    }
}