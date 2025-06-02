import Image from "next/image";
import styles from "./page.module.css";
import RadniciPage from "./radnici/page";
import Link from "next/link";
import { Calendar, Users } from "lucide-react";

const Dashboard = () => {
  return (
    <div>
      <Link href="/radnici"> <Users />       </Link>
      <Link href="/kalendar">Evidencija radnih sati<Calendar /></Link>
    </div >
  );
}

export default Dashboard;
