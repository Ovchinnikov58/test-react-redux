import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Menu.module.scss'

export default class Menu extends React.Component {

    render() {
        return (
            <nav className={classes.Menu}>
                <ul className={classes.MenuList}>
                    <li className={classes.MenuItem}>
                        <NavLink to="/" exact className={classes.MenuLink} activeClassName={classes.active}>
                            Расчет
                        </NavLink>
                    </li>

                    <li className={classes.MenuItem}>
                        <NavLink to="/attendance" className={classes.MenuLink}>
                            Отчет
                        </NavLink>
                    </li>

                    <li className={classes.MenuItem}>
                        <NavLink to="/info" className={classes.MenuLink}>
                            Инфо
                        </NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}