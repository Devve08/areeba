import './App.css'
import AddCustomerForm from './components/AddCustomerForm';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './screens/Home';
import EditCustomer from './screens/EditCustomer';
import ViewCustomer from './screens/ViewCustomer';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/addCustomer' element={<AddCustomerForm />} />
          <Route path='/editCustomer/:id' element={<EditCustomer />} />
          <Route path=':id' element={<ViewCustomer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
