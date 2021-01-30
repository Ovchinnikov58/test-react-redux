import React from 'react';
import classes from './Input.module.scss'

export default class Input extends React.Component {

    render() {
        let inputClasses = [classes.InputItem];

        //inputClasses.push(classes.InputItemError);

        return (
            <div className={classes.Input}>
                <label htmlFor="input" className={classes.InputText}>{this.props.text}</label>
                <input type="text" className={inputClasses.join(' ')}/>
            </div>
        )
    }
}