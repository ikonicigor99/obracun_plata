import Link from "next/link";
import styles from "@/styles/navBar.module.css";

const NavBar = () => {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.logo}>OBRACUN PLATA</div>
                <div className={styles.headerLinks}>
                    {" "}
                    <Link className={styles.btnDashboard} href="/">
                        Dashboard
                    </Link>
                </div>

                <div>Odjavi se</div>
            </div>
        </>
    );
};

export default NavBar;
