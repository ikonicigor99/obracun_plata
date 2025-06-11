import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { Calendar, Users } from "lucide-react";

const Dashboard = () => {
  return (
    <div className={styles.main}>
      <div className={styles.holderLink}>
        <Link className={styles.holderbuttonRadnici} href="/radnici">
          {" "}
          <Users size={60} className={styles.iconUsers} />
          <div>Radnici </div>{" "}
        </Link>
      </div>
      <div className={styles.holderLink}>
        <Link className={styles.holderbuttonKalendar} href="/kalendar">
          <Calendar size={60} className={styles.iconCalendar} />
          <div>Evidencija radnih sati</div>
        </Link>
      </div>{" "}
      <Link href="/radnidani">
        <div>radni dani</div>
      </Link>
    </div>
  );
};

export default Dashboard;
