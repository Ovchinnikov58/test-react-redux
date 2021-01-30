import React from 'react';
import Input from '../../components/base/input/Input'
import classes from './Home.module.scss'

export default class Home extends React.Component {

    render() {
        return (
            <div className={classes.Home}>
                <div className={classes.column}>
                    <Input
                        text={'Введите название предмета'}
                    />
                </div>
                <div className={classes.column}>
                    <Input
                        text={'Введите количество оценок'}
                        type={'amount'}
                    />
                </div>
                <div className={classes.column}>
                    <Input
                        text={'Пропущенные занятия по неуважительной причине'}
                    />

                    <Input
                        text={'Пропущенные занятия по уважительной причине'}
                    />
                </div>
            </div>
        )
    }
}