import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'

import Layout from './pages/Layout/Layout'
import HomePage from './pages/HomePage/HomePage'
import ServicePage from './pages/ServicePage/ServicePage'
import DoctorsPage from './pages/DoctorsPage/DoctorsPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import NewsPage from './pages/NewsPage/NewsPage'
import ServicesPage from './pages/ServicesPage/ServicesPage'
import StaffPage from './pages/StaffPage/StaffPage'

import PrivateRoute from './components/PrivateRoute'
import AdminLayout from './pages/AdminLayout/AdminLayout'
import RecordsPage from './pages/RecordsPage/RecordsPage'
import ReviewsPage from './pages/ReviewsPage/ReviewsPage'
import NewsAdmin from './pages/NewsAdmin/NewsAdmin'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="schedule" element={<ServicePage />} />
                        <Route path="trainers" element={<DoctorsPage />} />
                        <Route path="news" element={<NewsPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>

                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute>
                                <AdminLayout />
                            </PrivateRoute>
                        }
                    >
                        <Route index element={<Navigate to="applications" replace />} />
                        <Route path="applications" element={<RecordsPage />} />
                        <Route path="reviews" element={<ReviewsPage />} />
                        <Route path="programs" element={<ServicesPage />} />
                        <Route path="trainers" element={<StaffPage />} />
                        <Route path="news" element={<NewsAdmin />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App