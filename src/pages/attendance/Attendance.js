import React from 'react';
import classes from './Attendance.module.scss'

export default class Attendance extends React.Component {
    state = {
        report: []
    }

    async loadInfo() {
        try {
            let url = 'http://localhost:8000/lessons';
            let response = await fetch(url);
            let report = await response.json();

            this.setState({
                report
            })
        }
        catch(e) {
            console.log(e)
        }
    }

    componentDidMount() {
        this.loadInfo();
    }

    render() {
        return this.state.report.map((item, index) => {
            return (
                <div className={classes.Attendance} key={index}>
                    <div className={classes.AttendanceItem}>
                        <h2 className={classes.AttendanceTitle}>
                            Предмет: <span className={classes.AttendanceBold}>{item.lesson}</span>
                        </h2>

                        <p className={classes.AttendanceText}>
                            Средний балл:&nbsp;<span className={classes.AttendanceBold}>{Math.round(item.middleValue*10)/10}</span>
                        </p>

                        <p className={classes.AttendanceText}>Процент пропущенных занятий без уважительной причины:&nbsp;
                            <span className={classes.AttendanceBold}>{Math.round(item.procent*10)/10}%</span>
                        </p>

                        <p className={classes.AttendanceText}>Экзамен сдан автоматом:&nbsp;
                            {
                                (item.exam)
                                    ? <span className={classes.AttendanceBold}>Да</span>
                                    : <span className={classes.AttendanceBold}>Нет</span>
                            }
                        </p>
                    </div>
                </div>
            )
        })
    }
}