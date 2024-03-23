import { ProductsTable } from "./components/TableProducts"
import { FirebaseProvider } from "./context/Firebase.context"
import ProductsModal from './components/Modal/ProductsModal'
import logo from './img/logo.jpg'

function App() {
return (
    <>
      <img src={logo} alt="logo" />
      <h1>Tabela de Produtos da OAK Tecnologia</h1>
      <FirebaseProvider>
        <ProductsModal />
        <ProductsTable />
      </FirebaseProvider>
    </>
  )
}

export default App
