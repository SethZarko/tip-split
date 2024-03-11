// Components
import { Bill } from '../components/Bill.jsx';
import { Tips } from '../components/Tips.jsx';
import { NumberOfPeople } from '../components/NumberOfPeople.jsx';
import { FinalDisplay } from '../components/FinalDisplay.jsx';

export const Home = () => {

  return (
    <section id="home">
        <div className="desktop-container">
          <div className="desktop-sub-container">
            <Bill />
            <Tips />
            <NumberOfPeople />
          </div>
          <FinalDisplay />
        </div>
    </section>
  );
};