import React from 'react';
import Input from '../../components/base/input/Input'
import Button from '../../components/base/button/Button'
import classes from './Home.module.scss'

class Home extends React.Component {
    state = {
        isFormValid: false,
        formControls: [
            {
                value: '',
                type: 'text',
                label: 'Введите название предмета',
                errorMessage: 'Поле не должно быть пустым',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            {
                value: '',
                type: 'number',
                label: 'Введите количество оценок',
                errorMessage: 'Введите число больше 0',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    interval: true
                }
            },
            {
                value: '',
                type: 'number',
                label: 'Пропущенные занятия по уважительной причине',
                errorMessage: 'Поле не должно быть пустым',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    missed: true
                }
            },
            {
                value: '',
                type: 'number',
                label: 'Пропущенные занятия по неуважительной причине',
                errorMessage: 'Поле не должно быть пустым',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    missed: true
                }
            },
            {
                value: '',
                type: 'number',
                label: 'Всего занятий в семестре',
                errorMessage: 'Значение не может быть меньше суммы пропущенных в семестре и меньше нуля',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    lessons: true
                }
            }
        ],
        markControls: [],
        result: {
            lesson: '',
            middleValue: '',
            procent: '',
            exam: '',
            disRespectful: '',
            respectful: ''
        }
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.interval) {
            isValid = Number(value.trim()) > 0 && isValid
        }

        if (validation.markInterval) {
            isValid = Number(value.trim()) > 1 && Number(value.trim()) <= 5 && isValid
        }

        if (validation.lessons) {
            if (this.state.formControls[2].value !== '' && this.state.formControls[3].value !== '') {
                let checkValues = Number(this.state.formControls[2].value) + Number(this.state.formControls[3].value)
                isValid = Number(value.trim()) > 0 && isValid && Number(value.trim()) >= Number(checkValues)
            }
        }

        if (validation.missed) {
            if (this.state.formControls[4].value !== '') {

            }
        }

        return isValid
    }

    onChangeHandler = (event, controlIndex) => {
        const formControls = [ ...this.state.formControls ]
        const control = formControls[controlIndex]

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        if (control.validation.interval) {
            const markControls = [];
            for (let i = 0; i < Number(control.value.trim()); i++) {
                markControls.push(
                    {
                        id: `${i}`,
                        value: '',
                        type: 'number',
                        label: 'Введите оценку',
                        errorMessage: 'Введите число от 2 до 5',
                        valid: false,
                        touched: false,
                        validation: {
                            required: true,
                            markInterval: true
                        }
                    }
                );
            }
            this.setState({
                markControls
            })
        }

        formControls[controlIndex] = control

        this.setState({
            formControls
        })
        this.checkIsFormValid()
    }

    onChangeMarkHandler = (event) => {
        const markControls = [ ...this.state.markControls ]
        const markId = event.target.parentNode.id
        const control = markControls[markId]

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        this.setState({
            markControls
        })
        this.checkIsFormValid()
    }

    checkIsFormValid = () => {
        let isFormValid = true

        Object.keys(this.state.formControls).forEach(name => {
            isFormValid = this.state.formControls[name].valid && isFormValid
        })

        this.state.markControls.forEach(el => {
            isFormValid = el.valid && isFormValid
        })

        if (this.state.markControls.length === 0) {
            isFormValid = false
        }

        this.setState({
            isFormValid
        })
    }

    renderMarkInputs() {
        if (this.state.markControls.length !== 0 && Array.isArray(this.state.markControls)) {
            return this.state.markControls.map((item, index) => {
                return (
                    <Input
                        id={index}
                        key={'mark' + index}
                        label={item.label}
                        type={item.type}
                        value={item.value}
                        valid={item.valid}
                        touched={item.touched}
                        errorMessage={item.errorMessage}
                        onChange={event => this.onChangeMarkHandler(event)}
                    />
                )
            })
        }
    }

    calculate = () => {
        const result = { ...this.state.result }

        const SumValue = this.state.markControls && this.state.markControls.reduce((sum, item) => Number(sum)
            + Number(item.value), 0)
        result.middleValue = SumValue/this.state.markControls.length

        result.lesson = this.state.formControls[0].value
        result.respectful = this.state.formControls[2].value
        result.disRespectful = this.state.formControls[3].value
        const lessons = this.state.formControls[4].value
        result.procent = result.disRespectful*100/lessons
        result.exam = false

        if (result.procent < 10 && result.middleValue > 4) {
            result.exam = true
        }

        this.setState({
            result
        })
    }

    async sendInfo() {
        try {
            let response = await fetch('http://localhost:8000/lessons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.state.result)
            });

            let result = await response.json();
            this.clearForm()
        }
        catch(e) {
            console.log(e)
        }
    }

    clearForm = () => {
        let inputs = document.querySelectorAll('input');

        for (let i = 0;  i < inputs.length; i++) {
            inputs[i].value = '';
        }

        let isFormValid = false;
        let formControls = [
            {
                value: '',
                type: 'text',
                label: 'Введите название предмета',
                errorMessage: 'Поле не должно быть пустым',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            {
                value: '',
                type: 'number',
                label: 'Введите количество оценок',
                errorMessage: 'Введите число больше 0',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    interval: true
                }
            },
            {
                value: '',
                type: 'number',
                label: 'Пропущенные занятия по уважительной причине',
                errorMessage: 'Поле не должно быть пустым',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    missed: true
                }
            },
            {
                value: '',
                type: 'number',
                label: 'Пропущенные занятия по неуважительной причине',
                errorMessage: 'Поле не должно быть пустым',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    missed: true
                }
            },
            {
                value: '',
                type: 'number',
                label: 'Всего занятий в семестре',
                errorMessage: 'Значение не может быть меньше суммы пропущенных в семестре и меньше нуля',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    lessons: true
                }
            }
        ];
        let markControls = [];
        let result = {
            lesson: '',
            middleValue: '',
            procent: '',
            exam: '',
            disRespectful: '',
            respectful: ''
        };

        this.setState({
            formControls,
            result,
            isFormValid,
            markControls
        })
    }

    render() {
        const control = this.state.formControls

        return (
            <div className={classes.Home}>
                <div className={classes.column}>
                    <Input
                        label={control[0].label}
                        type={control[0].type}
                        value={control[0].value}
                        valid={control[0].valid}
                        touched={control[0].touched}
                        errorMessage={control[0].errorMessage}
                        onChange={event => this.onChangeHandler(event, 0)}
                    />
                </div>
                <div className={classes.column}>
                    <Input
                        label={control[1].label}
                        type={control[1].type}
                        value={control[1].value}
                        valid={control[1].valid}
                        touched={control[1].touched}
                        errorMessage={control[1].errorMessage}
                        onChange={event => this.onChangeHandler(event, 1)}
                    />

                    { this.renderMarkInputs() }
                </div>
                <div className={classes.column}>
                    <Input
                        disabled={this.state.formControls[4].value !== ''}
                        label={control[2].label}
                        type={control[2].type}
                        value={control[2].value}
                        valid={control[2].valid}
                        touched={control[2].touched}
                        errorMessage={control[2].errorMessage}
                        onChange={event => this.onChangeHandler(event, 2)}
                    />

                    <Input
                        disabled={this.state.formControls[4].value !== ''}
                        label={control[3].label}
                        type={control[3].type}
                        value={control[3].value}
                        valid={control[3].valid}
                        touched={control[3].touched}
                        errorMessage={control[3].errorMessage}
                        onChange={event => this.onChangeHandler(event, 3)}
                    />

                    <Input
                        disabled={(this.state.formControls[2].value == '' || this.state.formControls[3].value == '')}
                        label={control[4].label}
                        type={control[4].type}
                        value={control[4].value}
                        valid={control[4].valid}
                        touched={control[4].touched}
                        errorMessage={control[4].errorMessage}
                        onChange={event => this.onChangeHandler(event, 4)}
                    />
                    {
                        (this.state.result.middleValue !== '')
                        ? <div className={classes.ButtonBox}>
                                <p>Средний балл:&nbsp;<span className={classes.Bold}>{Math.round(this.state.result.middleValue*10)/10}</span></p>
                                <p>Процент пропущенных по неуважительной причине занятий:&nbsp;
                                    <span className={classes.Bold}>{Math.round(this.state.result.procent*10)/10} %</span></p>
                                <p>Экзамен сдан автоматом:&nbsp;
                                    {
                                        (this.state.result.exam)
                                            ? <span className={classes.Bold}>Да</span>
                                            : <span className={classes.Bold}>Нет</span>
                                    }
                                </p>
                            </div>
                            : null
                    }
                    <Button
                        disabled={!this.state.isFormValid}
                        onClick={() => this.calculate()}
                        text={'Расчитать'}
                    />
                    <Button
                        disabled={!this.state.isFormValid || this.state.result.middleValue === ''}
                        onClick={() => this.sendInfo()}
                        text={'Отправить'}
                    />
                </div>
            </div>
        )
    }
}

export default Home