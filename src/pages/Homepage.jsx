import { Link } from "react-router-dom";
import Button from "../components/Button";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          Adventurize captures every step of your journey!
        </h1>
        <h2>
          It tracks your adventures across the globe, ensuring you never
          forget a single moment of your incredible experiences. Share your
          memories with friends and showcase how you've explored the world
          like never before.
        </h2>
        <Link to="/login">
          <Button type="primary">Start Tracking Now</Button>
        </Link>
      </section>
    </main>
  );
}
