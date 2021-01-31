import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Menu.module.scss'

export default class Menu extends React.Component {
    constructor(){
        super();

        this.state = {
            displayMenu: false,
        };

        this.toggleDropdownMenu = this.toggleDropdownMenu.bind(this);
    };

    toggleDropdownMenu(event) {
        event.preventDefault();
        if (!this.state.displayMenu) {
            this.setState({ displayMenu: true });
        } else {
            this.setState({ displayMenu: false });
        }
    }

    render() {
        return (
            <nav className={classes.Menu}>
                <ul className={classes.MenuList}>
                    <li className={classes.MenuItem}>
                        <NavLink to="/" exact className={classes.MenuLink} activeClassName={classes.active}>
                            Расчет успеваемости
                        </NavLink>
                    </li>

                    <li className={classes.MenuItem}>
                        <NavLink to="/attendance" className={classes.MenuLink}>
                            Загрузить отчет об успеваемости
                        </NavLink>
                    </li>

                    <li className={classes.MenuItem}>
                        <div className={classes.MenuDropBlock}>
                            <button className={classes.MenuDrop} onClick={this.toggleDropdownMenu}>
                                О нас
                            </button>

                            {
                                (this.state.displayMenu)
                                    ?
                                    <div onClick={this.toggleDropdownMenu}>
                                        <NavLink
                                            to="/info"
                                            className={classes.MenuDroped}
                                            //onClick={this.onClickEventHandler.bind(null, '/info')}
                                        >
                                            Статьи
                                        </NavLink>

                                        <NavLink
                                            to="/contacts"
                                            className={classes.MenuDroped + ' ' + classes.MenuDropedSecond}
                                            //onClick={this.onClickEventHandler.bind(null, '/contacts')}
                                        >
                                            Контакты
                                        </NavLink>
                                    </div>
                                    : null
                            }

                        </div>
                    </li>
                </ul>
            </nav>
        )
    }
}