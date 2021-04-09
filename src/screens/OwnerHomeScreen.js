import Header from "../components/Header";
import OwnerNavigation from "./../components/OwnerNavigation";

const OwnerHomeScreen = (props) => {
  return (
    <div>
      <OwnerNavigation />
      <Header title="Home Screen" />
      <section className="destinations">
        <div className="grid">
          <h1>WELCOME TO OWNER PAGE</h1>
        </div>
      </section>
    </div>
  );
};

export default OwnerHomeScreen;
