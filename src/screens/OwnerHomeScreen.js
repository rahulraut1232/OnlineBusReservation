import Header from "../components/Header";
import OwnerNavigation from "./../components/OwnerNavigation";
import { useHistory } from "react-router-dom";
const OwnerHomeScreen = (props) => {
  const history = useHistory();
  const user = localStorage.getItem('user')
  if(user === null||user===undefined) 
           { history.push("/signin");}
            
  return (
    <div>
       {
        
      <div>
      <OwnerNavigation />
      <Header title="Home Screen" />
      <section className="destinations">
        <div className="grid">
          <h1>WELCOME TO OWNER PAGE</h1>
        </div>
      </section>
      </div>
}
    </div>
  );
};

export default OwnerHomeScreen;
