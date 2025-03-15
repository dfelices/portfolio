import { useMediaQuery } from 'react-responsive'
import { Route, Routes} from 'react-router-dom'
// import MobileNav from './components/navigation/MobileNav'
// import DesktopNav from './components/navigation/DesktopNav'
import PageHome from './pages/PageHome'

function App() {

    return (
        <>
            <Routes>
                <Route path='/' element={<PageHome />} />
            </Routes>
        </>
    )
}

export default App