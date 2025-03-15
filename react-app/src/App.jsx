import { Route, Routes} from 'react-router-dom'
import PageHome from './pages/PageHome'

function App() {

    return (
        <Routes>
            <Route path='/' element={<PageHome />} />
        </Routes>
    )
}

export default App