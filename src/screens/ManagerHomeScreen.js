import Header from "../components/Header";
import ManagerNavigation from "./../components/ManagerNavigation";
const ManagerHomeScreen = (props) => {
  return (
    <div>
      <ManagerNavigation />
      <Header title="Home Screen" />
      <section className="destinations">
        <div className="grid">
          <h1>WELCOME TO MANAGER PAGE</h1>
        </div>
      </section>
    </div>
  );
};

export default ManagerHomeScreen;
