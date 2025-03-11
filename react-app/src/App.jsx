import { useMediaQuery } from 'react-responsive'
import { Route, Routes} from 'react-router-dom'
import MobileNav from './components/navigation/MobileNav'
import DesktopNav from './components/navigation/DesktopNav'
import PageHome from './pages/PageHome'
import WorkDetailsOverlay from './pages/WorkDetailsOverlay'

function App() {
    const isMobile = useMediaQuery({maxWidth: 768})

    return (
        <>
            <div>
                {isMobile? <MobileNav /> : <DesktopNav />}
            </div>
            <Routes>
                <Route path='/' element={<PageHome />} />
                <Route path='/work/:id' element={<WorkDetailsOverlay />} />
            </Routes>
            
        </>
    )
}

export default App