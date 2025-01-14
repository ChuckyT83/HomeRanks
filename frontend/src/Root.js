import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'

export default function Root () {
    return (
        <>
            <NavBar/>
            <main className='flex-shrink-0'>
                <div className='container'>
                <Outlet/>
                </div>
            </main>

        </>
    )
}
