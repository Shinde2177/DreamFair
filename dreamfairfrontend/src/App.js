import AddCategory from './categories/AddCategories';
import './App.css';
import UserForm from './Users/adduser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <div className="App">
     <UserForm/>
     <ToastContainer theme='dark'/>
    </div>
  );
}

export default App;
