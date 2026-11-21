import React, {useEffect, useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)

    const start = () => {
        // запускаем часы: каждую секунду берём реальное текущее время
        setDate(new Date())
        setTimerId(window.setInterval(() => setDate(new Date()), 1000))
    }

    const stop = () => {
        window.clearInterval(timerId)
        setTimerId(undefined)
    }

    // на всякий случай останавливаем таймер при размонтировании
    useEffect(() => {
        return () => window.clearInterval(timerId)
    }, [timerId])

    const onMouseEnter = () => setShow(true)
    const onMouseLeave = () => setShow(false)

    const pad = (value: number) => String(value).padStart(2, '0')

    const stringTime = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
    const stringDate = `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`

    // день недели на английском, месяц на английском (https://learn.javascript.ru/intl#intl-datetimeformat)
    const stringDay = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(date)
    const stringMonth = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(date)

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={timerId !== undefined} // задизэйблена, если таймер уже запущен
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={timerId === undefined} // задизэйблена, если таймер не запущен
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock
