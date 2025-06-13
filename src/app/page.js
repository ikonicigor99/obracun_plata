import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { Calendar, Users } from "lucide-react";

const Dashboard = () => {
  return (
    <div className={styles.main}>
      <div className={styles.holderLink}>
        <Link className={styles.holderbuttons} href="/radnici">
          {" "}
          <Users size={45} className={styles.iconUsers} />
          <div>Radnici </div>{" "}
        </Link>
      </div>
      <div className={styles.holderLink}>
        <Link className={styles.holderbuttons} href="/kalendar">
          <Calendar size={45} className={styles.iconCalendar} />
          <div>Evidencija radnih sati</div>
        </Link>
      </div>{" "}
      <div className={styles.holderLink}>
        <div className={styles.holderbuttons}>
          <Link href="/radnidani">
            <div>radni dani</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
