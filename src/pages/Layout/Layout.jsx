import { useDispatch } from 'react-redux'
import styles from './layout.module.css'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getRecords } from '../../redux/slices/recordSlice'
import CameModal from '../../components/CameModal/CameModal'
import { getService } from '../../redux/slices/servicesSlice'
import { getReviews } from '../../redux/slices/reviewsSlice'
import { getNews } from '../../redux/slices/newsSlice'
import { getDoctors } from '../../redux/slices/doctorsSlice'

function Layout() {
    const [modal, setModal] = useState(false)
    const [burger, setBurger] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getRecords())
        dispatch(getService())
        dispatch(getDoctors())
        dispatch(getReviews())
        dispatch(getNews())
    }, [dispatch])

    useEffect(() => {
        document.body.style.overflow = burger ? 'hidden' : ''

        return () => {
            document.body.style.overflow = ''
        }
    }, [burger])

    const handleAdminClick = () => {
        if (localStorage.getItem('admin') === 'true') {
            navigate('/admin')
        } else {
            setModal(true)
        }
    }

    return (
        <>
            <div className="container">
                <nav className={styles.navbar}>
                    <div className={styles.left}>
                        <NavLink className={styles.logo} to="/">
                            <h1>LEVEL </h1>
                            <div className={styles.logoImg}>
                                <span>UP</span>
                            </div>
                            <h1>
                                <span>FITNESS</span>
                            </h1>
                        </NavLink>
                    </div>

                    <div className={styles.info}>
                        <ul>
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => (isActive ? styles.active : '')}
                                >
                                    Главная
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/schedule"
                                    className={({ isActive }) => (isActive ? styles.active : '')}
                                >
                                    Расписание
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/trainers"
                                    className={({ isActive }) => (isActive ? styles.active : '')}
                                >
                                    Тренеры
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/news"
                                    className={({ isActive }) => (isActive ? styles.active : '')}
                                >
                                    Новости
                                </NavLink>
                            </li>
                        </ul>

                        <div>
                            <button className={styles.adminBtn} onClick={handleAdminClick}>
                                Административная панель
                            </button>
                        </div>

                        <div className={styles.burger}>
                            <div
                                onClick={() => setBurger(!burger)}
                                className={styles.burgerBtn}
                            >
                                <p className={burger ? styles.close : ''}></p>
                            </div>

                            {burger && (
                                <div className={styles.burgerContent}>
                                    <div className={styles.tel}>
                                        <a href="tel:+996555563636">+996 555 563 636</a>
                                    </div>

                                    <ul>
                                        <li>
                                            <NavLink
                                                onClick={() => setBurger(false)}
                                                to="/"
                                                className={({ isActive }) =>
                                                    isActive ? styles.active : ''
                                                }
                                            >
                                                Главная
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                onClick={() => setBurger(false)}
                                                to="/schedule"
                                                className={({ isActive }) =>
                                                    isActive ? styles.active : ''
                                                }
                                            >
                                                Расписание
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                onClick={() => setBurger(false)}
                                                to="/trainers"
                                                className={({ isActive }) =>
                                                    isActive ? styles.active : ''
                                                }
                                            >
                                                Тренеры
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                onClick={() => setBurger(false)}
                                                to="/news"
                                                className={({ isActive }) =>
                                                    isActive ? styles.active : ''
                                                }
                                            >
                                                Новости
                                            </NavLink>
                                        </li>

                                        <div>
                                            <button
                                                className={styles.adminBtn}
                                                onClick={() => {
                                                    handleAdminClick()
                                                    setBurger(false)
                                                }}
                                            >
                                                Админ
                                            </button>
                                        </div>
                                    </ul>

                                    <p className={styles.workTime}>
                                        Режим работы: <span>ПН-ВС: 07:00 – 22:00</span>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

                {modal && <CameModal setModal={setModal} />}
            </div>

            <div className="outlet">
                <Outlet />
            </div>
        </>
    )
}

export default Layout
