
import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Customer from './screens/Customers';
import Driver from './screens/Drivers';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark-plugin.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Aboutus from './components/Aboutus.js';
import Contactus from './components/Contactus.js';
import Safety from './components/Safety.js';
import Prices from './screens/Prices.js';
import Customerprofile from './screens/Customerprofile.js';
import Customerpro from './components/Customerpro.js';
import Customerpay from './components/Customerpay.js';
import Customerhis from './components/Customerhis.js';
import { WalletProvider } from './components/WalletContext';
import { UserProvider } from './components/UserContext';
import Driverprofile from './components/Driverprofile.js';
import Driverpro from './components/Driverpro.js';
import Driverpay from './components/Driverpay.js';
import Driverhis from './components/Driverhis.js';

function App() {
  return (
    <UserProvider>
      <WalletProvider>
        <Router>
          <div>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<Signup />} />
              <Route exact path='/signup/customer' element={<Customer />} />
              <Route exact path='/signup/driver' element={<Driver />} />
              <Route exact path='/Safety' element={<Safety />} />
              <Route exact path='/Aboutus' element={<Aboutus />} />
              <Route exact path='/Contactus' element={<Contactus />} />
              <Route exact path='/price' element={<Prices />} />
              <Route exact path='/customerprofile' element={<Customerprofile />} />
              <Route exact path='/customerprofile/customerpro' element={<Customerpro />} />
              <Route exact path='/customerprofile/customerpay' element={<Customerpay />} />
              <Route exact path='/customerprofile/customerhis' element={<Customerhis />} />
              <Route exact path='/driverprofile' element={<Driverprofile />} />
              <Route exact path='/driverprofile/driverpro' element={<Driverpro />} />
              <Route exact path='/driverprofile/driverpay' element={<Driverpay />} />
              <Route exact path='/driverprofile/driverhis' element={<Driverhis />} />
            </Routes>
          </div>
        </Router>
      </WalletProvider>
    </UserProvider>
  );
}

export default App;
