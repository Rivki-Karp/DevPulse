import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { StyleDefinitions } from './StyleDefinitions'
import { RouterProvider } from 'react-router-dom'
import route from './routes'
import './index.css'

createRoot(document.getElementById('root')!).render(

    <Provider store={store}>
      <ThemeProvider theme={StyleDefinitions('dark')}>
        <CssBaseline />
        <RouterProvider router={route} />
      </ThemeProvider>
    </Provider>

)