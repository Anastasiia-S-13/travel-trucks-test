import Link from "next/link";
import css from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={css.heroContainer}>
            <div className="container">
                <div className={css.textContainer}>
                    <h1>Campers of your dreams</h1>
                    <p>You can find everything you want in our catalog</p>
                    <Link href="/campers">View Now</Link>
                </div>
            </div>
        </section>
    );
}
